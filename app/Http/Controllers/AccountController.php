<?php

namespace App\Http\Controllers;


use App\Exceptions\CharacterNotOwned;
use App\Exceptions\TokenNotValid;
use App\Models\Character\CharacterInfo;
use App\Models\Messaging\Channel;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AccountController extends Controller
{

    public function index(){
        $scopes = config('eve-config.scopes', ['publicData']);
        $tokens = RefreshToken::query()->withTrashed()
            ->with('character')
            ->belongsToUser()
            ->get()
            ->makeHidden([
                'token',
                'refresh_token',
            ]);
        return Inertia::render('Accounts', [
            'tokens' => $tokens,
            'appScopes' => $scopes,
        ]);
    }

    public function deleteAccount(){
        CharacterInfo::whereHas('refresh_token', function ($query) {
            $query->where('user_id', auth()->user()->getKey());
        })->forceDelete();
        RefreshToken::where('user_id', auth()->user()->getKey())->forceDelete();
        Channel::where('user_id', auth()->user()->getKey())->forceDelete();
        User::where('id', auth()->user()->getKey())->forceDelete();

        auth()->logout();
        return redirect('/login');
    }

    public function syncHuntingCharacters(Request $request)
    {
        $character_id = $request->get('character_id', []);
        auth()->user()->hunting_characters()->sync($character_id);
        return response()->json(auth()->user()->hunting_characters);
    }

    public function setMainCharacter(RefreshToken $token){
        $user = auth()->user();

        if($token->trashed()){
            throw new TokenNotValid("This token is deleted. Please reauth the character before setting it as your main character");
        }

        if($token->user_id != $user->getKey()){
            throw new CharacterNotOwned("You do not own this character");
        }
        $user->main_character_id = $token->getKey();
        $user->name = $token->character->name;
        $user->save();

        return response()->json([
            'message' => "{$token->character->name} is now your main character"
        ]);
    }

    public function setActiveChannel(Channel $channel = null)
    {
        $user = auth()->user();
        $user->active_channel = !is_null($channel) ? $channel->getKey() : null;

        $user->save();
        return response()->json();
    }

    public function setPrimaryHunter(RefreshToken $character){

        if($character->user_id != auth()->user()->getKey()){
            throw new CharacterNotOwned("You do not own this character");
        }

        $user = auth()->user();
        $user->primary_hunter = $character->getKey();
        $user->save();

        return response()->json([
            'message' => "{$character->character->name} is now your main hunter"
        ]);
    }

    public function delete(Request $request, RefreshToken $token){
        $character = $token->character;
        $user = auth()->user();

        if($user->main_character_id === $token->getKey()){
            throw new \Exception("Cannot delete your main character");
        }

        $character->delete();
        $token->delete();

        return response()->json([
            'message' => "{$character->name} was Deleted"
        ]);
    }




    public function refreshAccessToken(RefreshToken $token){
        $action = new \App\Action\RefreshAccessToken($token);
        $token = $action->handle();
        return response()->json($token);
    }
}
