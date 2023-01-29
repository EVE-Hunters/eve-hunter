<?php

namespace App\Http\Controllers;

use App\Events\Hunting\BroadcastDestination;
use App\Job\Location\AccountDestinationSet;
use App\Models\Character\HuntingCharacter;
use App\Models\Messaging\Channel;
use App\Models\RefreshToken;
use App\Models\Sde\SolarSystem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HuntingController extends Controller
{
    public function index(){
        $tokens = RefreshToken::with('character')->where('user_id', auth()->user()->getKey())->get();
        $channels = Channel::Query()
            ->whereHas('access', function (Builder $query) {
                $query->whereIn('channel_access.entity_id', auth()->user()->entity_ids());
            })
            ->orDoesntHave('access')
            ->orWhere('user_id', auth()->user()->getKey())
            ->with('user','access')->get();
        $huntingCharacters = HuntingCharacter::where('user_id', auth()->user()->getKey())->get()
            ->pluck('character_id');


        return Inertia::render('Hunt', [
            'tokens' => $tokens,
            'channels' => $channels,
            'activeChannel' => auth()->user()->active_channel,
            'huntingCharacters' => $huntingCharacters,
        ]);
    }

    public function set_destination(SolarSystem $system, Request $request){
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        //Get Refresh Token of active hunters
        //dd($system, $request);
        $tokens = RefreshToken::query()->whereIn('character_id', $request->get('character_id', []))
            ->where('user_id', auth()->user()->getKey())
            ->get();

        //Broadcast destination
        //Indicate to others our intention while waiting for API response.
        broadcast(new BroadcastDestination($system, auth()->user()));

        AccountDestinationSet::dispatch(auth()->user(), $tokens, $system);

        return response()->json();
    }

}
