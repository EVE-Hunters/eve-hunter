<?php

namespace App\Events\Hunting;


use App\Models\Sde\SolarSystem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


class AlertWaypointSet implements ShouldBroadcast
{
    public SolarSystem $system;
    public User $user;

    public $queue='character';

    public function __construct(SolarSystem $system, User $user)
    {
        $this->system = $system;
        $this->user = $user;
    }

    public function broadcastAs(): string
    {
        return 'waypoint.set';
    }

    public function broadcastWith(): array
    {
        return [
            'system' => $this->system->name,
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn()
    {
        return new PrivateChannel("User.{$this->user->getKey()}");
    }
}
