<?php

namespace App\Http\Controllers\Auth;


use App\Events\UserCreated;
use App\Http\Controllers\Controller;
use App\Job\Character\Affiliation;
use App\Job\Character\Character;
use App\Models\Character\CharacterInfo;
use App\Models\RefreshToken;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Contracts\Factory as Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Illuminate\Support\Str;

class SSoController extends Controller
{

    public function redirect(Socialite $social)
    {
        session()->put('_redirect', request()->headers->get('referer'));
        return $social->driver('eveonline')
            ->scopes(config('eve-config.scopes', ['publicData']))
            ->redirect();
    }

    public function callback(Socialite $social)
    {

        $eve_user = $social->driver('eveonline')
            ->scopes(config('eve-config.scopes', ['publicData']))
            ->user();

        //Find / Create User
        $user = $this->findOrCreateUser($eve_user);

        //Create / Find Character Record
        $this->updateRefreshToken($eve_user, $user);

        $this->updateCharacter($eve_user);

        //Authenticate user
        $this->loginUser($user);

        $redirect = session()->pull('_redirect', '/');
        session()->forget('_redirect');
        if(Str::contains($redirect, 'login')){
            $redirect = '/';
        }

        //return to opp.
        return redirect($redirect);
    }

    private function findOrCreateUser(SocialiteUser $eve_user): User
    {
        //remove if character is new user
        RefreshToken::where('character_id', $eve_user->id)
            ->where('character_owner_hash', '<>', $eve_user->character_owner_hash)
            ->whereNull('deleted_at')
            ->delete();

        $user = User::whereHas('refresh_tokens', function ($query) use ($eve_user) {
            $query->where('character_id', $eve_user->id)
                ->where('character_owner_hash', '=', $eve_user->character_owner_hash)
                ->whereNull('deleted_at');
        })->first();

        if (auth()->check()) {
            if (!is_null($user) && auth()->user()->id !== $user->id) {
                RefreshToken::where('character_id', $eve_user->id)
                    ->where('user_id', $user->id)
                    ->delete();
            }

            $user = auth()->user();
        }

        if ($user)
            return $user;


        $user = User::firstOrCreate([
            'main_character_id' => $eve_user->id,
        ], [
            'name' => $eve_user->name,
            'primary_hunter' => $eve_user->id
        ]);

        return $user;
    }

    private function updateRefreshToken(SocialiteUser $eve_user, User $user)
    {

        $existing_token = RefreshToken::withTrashed()->where('character_id', $eve_user->id)
            ->where('character_owner_hash', '<>', $eve_user->character_owner_hash)
            ->first();

        if (!is_null($existing_token)) {
            event('security.log', [
                sprintf('Owner changed for character %s', $eve_user->name),
                'authentication',
            ]);
        }

        $token = RefreshToken::withTrashed()->firstOrNew([
            'character_id' => $eve_user->id,
        ], [
            'user_id' => $user->id,
            'refresh_token' => $eve_user->refreshToken,
            'scopes' => $eve_user->scopes,
            'token' => $eve_user->token,
            'character_owner_hash' => $eve_user->character_owner_hash,
            'expires_on' => $eve_user->expires_on,
            'version' => RefreshToken::CURRENT_VERSION
        ]);
        $token->scopes = $eve_user->scopes;
        $token->token = $eve_user->token;
        $token->refresh_token = $eve_user->refreshToken;
        $token->save();

        RefreshToken::onlyTrashed()
            ->where('character_id', $eve_user->id)
            ->where('user_id', $user->id)
            ->restore();
    }

    private function updateCharacter(SocialiteUser $eve_user)
    {
        CharacterInfo::firstOrCreate([
            'character_id' => $eve_user->id,
        ], [
            'name' => $eve_user->name,
        ]);

        //Spawn any jobs required
        //Character::dispatch($eve_user->id);
        Affiliation::dispatch([$eve_user->id]);
    }

    public function loginUser(User $user): bool
    {
        auth()->login($user, true);
        return true;
    }

}
