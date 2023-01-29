<?php

namespace App\Console\Commands\Characters;

use App\Job\Location\CharacterOnline;
use App\Models\Character\CharacterInfo;
use Illuminate\Console\Command;

class Online extends Command
{

    protected $signature = 'hunters:characters:online';

    public function handle(){

        $characters = CharacterInfo::whereHas('refresh_token')->with('refresh_token')->get();
        $characters->each(function(CharacterInfo $character){
            CharacterOnline::dispatch($character->refresh_token);
        });

    }
}
