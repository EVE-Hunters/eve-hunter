<?php

namespace App\Http\Controllers\Location;

use App\Action\GetSystemsWithinJumps;
use App\Http\Controllers\Controller;
use App\Job\Location\CharacterLocation;
use App\Models\Character\CharacterInfo;
use App\Models\RefreshToken;
use Illuminate\Http\Request;
use App\Models\Sde\SolarSystem;

class LocationController extends Controller
{

    public function location(Request $request){
        $id = $request->get('character_id', []);


        $tokens = RefreshToken::query()->with('character')
            ->whereIn('character_id', $id)
            ->where('user_id', auth()->user()->id)->get();

        $tokens->each(function($token){
            CharacterLocation::dispatchSync($token, auth()->user());
        });

        return response()->json();
    }

    public function findSystem(Request $request){

        $systems = SolarSystem::Query()->where('name', 'like', "%{$request->get('name')}%")->limit(25)->get();

        return response()->json(['systems'=>$systems]);
    }

    public function getNearSystems(SolarSystem $system, Request $request){
        $cache_key = "system.{$system->getKey()}.jumps.{$request->get('jumps', 5)}";
        $systems = \Cache::remember($cache_key, 60, function() use($system, $request){
            return (new GetSystemsWithinJumps($system, $request->get('jumps', 5)))->handle();
        });
        return $systems;
    }

    public function setDestination(SolarSystem $system){
        //Set waypoint for each hunter character
    }
}
