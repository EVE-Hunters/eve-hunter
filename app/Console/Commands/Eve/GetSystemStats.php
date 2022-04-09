<?php


namespace App\Console\Commands\Eve;


use App\Job\Universe\SystemJumps;
use App\Job\Universe\SystemKills;
use Illuminate\Console\Command;


class GetSystemStats extends Command
{

    protected $signature = 'bh:get-system-stats';

    public function handle()
    {
        SystemKills::dispatchSync();
        SystemJumps::dispatchSync();
    }
}
