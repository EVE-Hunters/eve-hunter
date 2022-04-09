<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TestMessage implements ShouldBroadcast
{

    public $data = [];

    public $queue = 'character';

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function broadcastWith()
    {
        return $this->data;
    }

    public function boadcastAs()
    {
        return "test.message";
    }

    public function broadcastOn()
    {
        return new Channel('testing');
    }
}
