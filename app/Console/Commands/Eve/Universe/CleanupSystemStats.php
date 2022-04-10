<?php

namespace App\Console\Commands\Eve\Universe;

use App\Models\Sde\SystemJumps;
use App\Models\Sde\SystemKills;
use Illuminate\Console\Command;

class CleanupSystemStats extends Command
{

    protected $signature = 'eve:universe:cleanup-system-stats';

    public function handle()
    {
        $threshold = carbon('now')->subDay(2);
        SystemKills::query()->where('created_at', '<=', $threshold)->delete();
        SystemJumps::query()->where('created_at', '<=', $threshold)->delete();
    }

}
