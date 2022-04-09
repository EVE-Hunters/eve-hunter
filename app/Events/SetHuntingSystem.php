<?php

namespace App\Events;


use App\Models\Sde\SolarSystem;
use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SetHuntingSystem implements ShouldBroadcast
{

    public User $user;
    public SolarSystem $system;

    public $queue = 'character';


    public function __construct(SolarSystem $system, User $user)
    {
        $this->user = $user;
        $this->system = $system;
    }

    public function broadcastWith()
    {
        return [
            'system' => $this->system
        ];
    }

    public function broadcastAs(){
        return 'hunting.from';
    }

    public function broadcastOn()
    {
        return new PrivateChannel("User.{$this->user->getKey()}");
    }
}
