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


class BroadcastMessage implements ShouldBroadcastNow
{

    protected User $user;

    protected $message;
    public $queue = 'high';

    public function __construct(User $user, $message)
    {
        $this->user = $user;
        $this->message = $message;

    }


    public function broadcastAs(): string
    {
        return 'user-message';
    }

    public function broadcastWith(): array
    {
        return [
            'user' => $this->user->only(['id','name']),
            'message' => $this->message,
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('hunters.'.auth()->user()->active_channel);
    }
}
