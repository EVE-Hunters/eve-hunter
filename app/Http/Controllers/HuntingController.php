<?php

namespace App\Http\Controllers;

use App\Events\Hunting\BroadcastDestination;
use App\Job\Location\SetDestination;
use App\Models\RefreshToken;
use App\Models\Sde\SolarSystem;
use Illuminate\Http\Request;

class HuntingController extends Controller
{


    public function set_destination(SolarSystem $system, Request $request){

        //Get Refresh Token of active hunters
        //dd($system, $request);
        $tokens = RefreshToken::query()->whereIn('character_id', $request->get('character_id', []))
            ->where('user_id', auth()->user()->getKey())
            ->get();

        // Call API End point
        $tokens->each(function($token) use ($system){
           SetDestination::dispatch($token, $system->getKey(), true);
        });

        //Broadcast destination
        broadcast(new BroadcastDestination($system, auth()->user()));
        return response()->json();
    }

}
