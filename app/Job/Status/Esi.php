<?php

namespace App\Job\Status;

use App\Models\Status\EsiStatus;

class Esi extends \LaravelEveTools\EveApi\Jobs\Status\Esi
{

    public $queue = 'high';

    public function handle()
    {
        $start = microtime(true);

        try {
            $status = $this->retrieve()->raw;
        }catch(\Exception $e){
            $status = 'Request failed with: ' . $e->getMessage();
        }

        $end = microtime(true)-$start;

        EsiStatus::create([
            'status' => $status,
            'request_time' => $end
        ]);

    }
}
