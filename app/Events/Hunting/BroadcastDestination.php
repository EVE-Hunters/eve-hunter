<?php

namespace App\Events\Hunting;

use App\Models\Character\CharacterInfo;
use App\Models\Sde\SolarSystem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


class BroadcastDestination implements ShouldBroadcast
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
        return 'destination.set';
    }

    public function broadcastWith(): array
    {
        return [
            'character' => $this->user->main_character,
            'system' => $this->system,
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('hunters.'.$this->user->active_channel);
    }
}
