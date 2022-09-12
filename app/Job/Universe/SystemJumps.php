<?php


namespace App\Job\Universe;


class SystemJumps extends \LaravelEveTools\EveApi\Jobs\Universe\SystemJumps
{

    public $queue = 'universe';

    public function handle()
    {
        $jumps = $this->retrieve();

        if (!$jumps->isCachedLoad()) {
            collect($jumps)->each(function ($system) {
                \App\Models\Sde\SystemJumps::create([
                    'system_id' => $system->system_id,
                    'ship_jumps' => $system->ship_jumps
                ]);
            });
        }
    }
}
