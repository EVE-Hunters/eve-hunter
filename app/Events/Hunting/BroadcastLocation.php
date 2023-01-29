<?php

namespace App\Events\Hunting;

use App\Models\Character\CharacterInfo;
use App\Models\Sde\SolarSystem;
use Carbon\Carbon;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;


class BroadcastLocation implements ShouldBroadcastNow
{
    public SolarSystem $system;
    public CharacterInfo $character;

    public $queue = 'high';

    public function __construct(SolarSystem $system, CharacterInfo $character)
    {
        $this->system = $system;
        $this->character = $character;
    }


    public function broadcastAs(): string
    {
        return 'location.update';
    }

    public function broadcastWith(): array
    {
        return [
            'character' => $this->character->only(['character_id', 'name']),
            'system_id' => $this->system->getKey(),
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('hunters.'.auth()->user()->active_channel);
    }
}
