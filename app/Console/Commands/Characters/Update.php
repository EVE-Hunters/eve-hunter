<?php

namespace App\Console\Commands\Characters;

use App\Job\Character\Affiliation;
use App\Models\Character\CharacterInfo;
use Illuminate\Console\Command;

class Update extends Command
{

    protected $signature = 'hunters:characters:update';

    public function handle(){

        $characters = CharacterInfo::all();
        Affiliation::dispatch($characters->pluck('character_id')->toArray());

    }
}
