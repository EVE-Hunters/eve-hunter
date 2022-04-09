<?php


namespace App\Job\Universe;


use Illuminate\Contracts\Queue\ShouldBeUnique;
use LaravelEveTools\EveApi\Jobs\Universe\SystemKills as SystemKillsBase;

class SystemKills extends SystemKillsBase implements ShouldBeUnique
{

    public $queue = 'universe';

    public function handle()
    {
        $kills = $this->retrieve();

        if(!$kills->isCachedLoad()){
            collect($kills)->each(function($system){
                \App\Models\Sde\SystemKills::create([
                    'system_id' => $system->system_id,
                    'npc_kills' => $system->npc_kills,
                    'pod_kills' => $system->pod_kills,
                    'ship_kills'=> $system->ship_kills
                ]);
            });
        }
    }
}
