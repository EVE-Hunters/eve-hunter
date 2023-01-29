<?php

namespace App\Events\Hunting;

use App\Models\Character\CharacterInfo;
use App\Models\Sde\SolarSystem;
use Carbon\Carbon;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Collection;


class BroadcastLocationBatch implements ShouldBroadcastNow
{
    public Collection $dtos;

    public $queue = 'high';

    public function __construct(Collection $locationDtos)
    {
        $this->dtos = $locationDtos;
    }


    public function broadcastAs(): string
    {
        return 'location.batch.update';
    }

    public function broadcastWith(): array
    {
        return [
            'data' => $this->dtos->toArray(),
            'datetime' => Carbon::now()->toDateTimeString()
        ];
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('hunters.'.auth()->user()->active_channel);
    }
}
