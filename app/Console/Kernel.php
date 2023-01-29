<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Get Status of ESI server
        $schedule->command('eve:esi:status')->everyMinute();

        // Gets Universe Stats
        $schedule->command('eve:universe:update-system-stats')->hourly();

        //Clean up old stats
        $schedule->command('eve:universe:cleanup-system-stats')->hourly();

        //Update characters
        $schedule->command('hunters:characters:update')->everySixHours();

        //need a secured esi job to prevent tokens from invalidating
        $schedule->command('hunters:characters:online')->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
