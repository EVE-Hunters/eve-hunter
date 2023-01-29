<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use LaravelEveTools\EveSeeder\Models\SdeSettings;

class SdeController extends Controller
{

    public function CurrentSdeVersion(){
        return response()->json(SdeSettings::first());
    }


    public function SolarSystems(){
        return Storage::get('sde/systems.json');
    }

    public function Stargates(){
        return Storage::get('sde/gates.json');
    }


}
