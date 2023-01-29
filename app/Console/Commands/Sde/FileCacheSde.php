<?php

namespace App\Console\Commands\Sde;

use App\Models\Sde\SolarSystem;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use LaravelEveTools\EveSeeder\Models\Sde\MapSolarSystemJump;

class FileCacheSde extends Command
{

    protected $signature = 'sde:file-cache';

    public function handle(){

        $systems = SolarSystem::all();
        Storage::disk('local')->put('sde/systems.json', $systems->toJson());

        $connections = MapSolarSystemJump::all();
        Storage::disk('local')->put('sde/gates.json', $connections->toJson());

    }
}
