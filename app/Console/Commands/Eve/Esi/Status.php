<?php

namespace App\Console\Commands\Eve\Esi;

use App\Job\Status\Esi;
use Illuminate\Console\Command;

class Status extends Command
{

    protected $signature = "eve:esi:status";

    public function handle(){
        Esi::dispatch();
    }
}
