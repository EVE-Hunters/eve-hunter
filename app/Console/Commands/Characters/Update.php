<?php

namespace App\Console\Commands\Characters;

use App\Job\Character\Character;
use App\Models\Character\CharacterInfo;
use Illuminate\Console\Command;

class Update extends Command
{

    protected $signature = 'hunters:characters:update';

    public function handle(){

        $characters = CharacterInfo::all();
        $characters->each(function(CharacterInfo $character){
            Character::dispatch($character->getKey());
        });

    }
}
