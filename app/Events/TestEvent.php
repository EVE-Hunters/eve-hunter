<?php


namespace App\Events;


use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class TestEvent implements ShouldBroadcast
{

    public function broadcastAs()
    {
        return 'test.event';
    }

    public function broadcastWith()
    {
        return ['message'=> 'this is a test', 'timestamp'=>Carbon::now()->toDateTimeString()];
    }

    public function broadcastOn()
    {
        return new Channel('testingchannel');
    }
}
