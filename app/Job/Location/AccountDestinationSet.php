<?php

namespace App\Job\Location;

use App\Events\Hunting\AlertWaypointSet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Sde\SolarSystem;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class AccountDestinationSet implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;



    protected User $user;
    protected Collection $tokens;
    protected SolarSystem $system;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user,Collection $tokens, SolarSystem $system)
    {
        $this->user = $user;
        $this->tokens = $tokens;
        $this->system = $system;
        $this->queue = 'character';
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->tokens->each(function($token){
            SetDestination::dispatchSync($token, $this->system->getKey(), true);
        });

        broadcast(new AlertWaypointSet($this->system, $this->user));
    }
}
