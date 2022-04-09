<?php

namespace App\Console\Commands\Eve;

use App\Job\Status\Esi;
use Illuminate\Console\Command;

class EsiStatus extends Command
{

    protected $signature = "eve:esi:status";

    public function handle(){
        Esi::dispatch();
    }
}
