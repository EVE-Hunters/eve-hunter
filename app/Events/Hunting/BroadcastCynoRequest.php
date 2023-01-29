<?php

namespace App\Events\Hunting;

use App\Models\Character\CharacterInfo;
use App\Models\Sde\SolarSystem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;


class BroadcastCynoRequest implements ShouldBroadcastNow
{
    public SolarSystem $system;
    public User $user;

    public $queue = 'high';

    public function __construct(SolarSystem $system, User $user)
    {
        $this->system = $system;
        $this->user = $user;
    }


    public function broadcastAs(): string
    {
        return 'request-cyno';
    }

    public function broadcastWith(): array
    {
        return [
            'user' => $this->user->only(['id','name']),
            'system' => $this->system->only(['system_id', 'name']),
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('hunters.'.auth()->user()->active_channel);
    }
}
