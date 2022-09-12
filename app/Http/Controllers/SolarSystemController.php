<?php

namespace App\Http\Controllers;

use App\Models\Sde\SolarSystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use LaravelEveTools\EveSeeder\Models\Sde\MapSolarSystemJump;

class SolarSystemController extends Controller
{


    public function index(){
        $systems = Cache::remember('solar-systems', 86400, function(){
            return SolarSystem::all();
        });
        $connections = Cache::remember('solar-systems-connections', 86400, function(){
            return MapSolarSystemJump::all();
        });
        return response()->json([
            'systems' => $systems,
            'gates' => $connections,
        ]);
    }
}
