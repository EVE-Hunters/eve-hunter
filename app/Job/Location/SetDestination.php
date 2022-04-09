<?php

namespace App\Job\Location;

use LaravelEveTools\EveApi\Jobs\UserInterface\Waypoint;
use LaravelEveTools\EveApi\Models\RefreshToken;

class SetDestination extends Waypoint
{

    public $queue = 'character';

}
