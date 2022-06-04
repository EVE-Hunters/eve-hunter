<?php

namespace App\Http\Controllers;

use App\Events\Hunting\BroadcastDestination;
use App\Job\Location\AccountDestinationSet;
use App\Models\RefreshToken;
use App\Models\Sde\SolarSystem;
use Illuminate\Http\Request;

class HuntingController extends Controller
{


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
