<?php

namespace App\Job\Location;

use LaravelEveTools\EveApi\Jobs\Location\Online;

class CharacterOnline extends Online {

    public $queue = 'character';

    public function handle(){
        $this->retrieve();
    }


}
