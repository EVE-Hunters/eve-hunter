<?php


namespace App\Events;


use App\Models\Character\CharacterInfo;

use Illuminate\Broadcasting\PresenceChannel;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use LaravelEveTools\EveSeeder\Models\Sde\SolarSystem;
use LaravelEveTools\EveSeeder\Models\Sde\StaStation;

class LocationUpdated implements ShouldBroadcast
{
    public CharacterInfo $character;
    public int $presence_channel;
    public int $system_id;

    public $queue = 'character';

    public function __construct(CharacterInfo $character,
        int $system_id,
        int $presence_channel
    )
    {
        $this->character = $character;
        $this->system_id = $system_id;
        $this->presence_channel = $presence_channel;
    }

    public function broadcastAs()
    {
        return 'location.updated';
    }

    public function broadcastWith()
    {
        return [
            'character'=>$this->character->only('name', 'character_id'),
            'system_id'=>$this->system_id
        ];
    }

    public function broadcastOn()
    {
        return new PresenceChannel('hunters.'.$this->presence_channel);
    }
}
