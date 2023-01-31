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

    public function delete(Request $request, RefreshToken $token){
        $character = $token->character;
        $user = auth()->user();

        if($user->main_character_id === $token->getKey()){
            //throw new \Exception("Cannot delete your main character");
            return redirect()->route('inertia.characters')->with([
                'message' => [

                    "You cannot delete your main character"
                ]
            ]);
        }

        if($token->user_id !== auth()->user()->getKey()){
            return redirect()->route('inertia.characters')->with([
                'error' => "This is not your character to delete."
            ]);
        }

        $character->delete();
        $token->forceDelete();

        return response()->json([
            'message' => "{$character->name} was Deleted"
        ]);

    }
}
