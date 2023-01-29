<?php

namespace App\Job\Search;

use App\Job\Character\Character;
use App\Job\Universe\Names;
use App\Models\Character\CharacterInfo;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Support\Facades\Log;
use LaravelEveTools\EveApi\Jobs\Search\CharacterSearch;

class SearchNames extends CharacterSearch implements ShouldBeUnique {

    public $queue = 'universe';

    public function handle(){

        $this->query_string = [
            'categories' => implode(',', ['character', 'corporation', 'alliance']),
            'search' => $this->search
        ];

        $result = $this->retrieve();

        $search_id = $result->character;

        $characters = CharacterInfo::query()->select('character_id')->distinct()
            ->whereIn('character_id', $search_id)->get()->pluck('character_id')->toArray();

        $corporation = $result->optional('corporation');
        $alliance = $result->optional('alliance');
        Names::dispatchNow($alliance ?? [], $corporation ?? []);

        collect($search_id)->diff(collect($characters))->random(50)->each(function ($id) {
            Character::dispatch($id);
        });



    }


}
