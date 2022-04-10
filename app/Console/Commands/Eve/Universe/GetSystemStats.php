<?php


namespace App\Console\Commands\Eve\Universe;


use App\Job\Universe\SystemJumps;
use App\Job\Universe\SystemKills;
use Illuminate\Console\Command;


class GetSystemStats extends Command
{

    protected $signature = 'eve:universe:update-system-stats';

    public function handle()
    {
        SystemKills::dispatchSync();
        SystemJumps::dispatchSync();
    }
}
