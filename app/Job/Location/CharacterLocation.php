<?php


namespace App\Job\Location;


use App\Events\LocationUpdated;
use App\Events\SetHuntingSystem;
use App\Events\TestMessage;
use App\Models\Character\CharacterInfo;
use App\Models\Location\LocationHistory;
use App\Models\RefreshToken;
use App\Models\User;
use LaravelEveTools\EveApi\Jobs\Location\Location;


class CharacterLocation extends Location
{

    private User $user;
    private CharacterInfo $character;

    public $queue = 'character';

    public function __construct(RefreshToken $token, User $user)
    {
        parent::__construct($token);
        $this->character = $token->character;
        $this->user = $user;
    }

    /**
     * @var array
     */
    public $tags = ['character', 'meta'];

    public function handle()
    {
        //Call & retrieve the ESI response
        $location = $this->retrieve([
            'character_id' => $this->getCharacterId(),
        ]);

        //Get the last history for the character
        $latest = LocationHistory::where(['character_id' => $this->getCharacterId()])->latest()->first();
        //Create a new Location object from the esi response
        $new = new LocationHistory([
            'character_id' => $this->getCharacterId(),
            'solar_system_id' => $location->solar_system_id,
        ]);

        //if there is no history, or the location has changed
        //save the new location.
        if (is_null($latest) || !$latest->isSameLocationAs($new)) {
            $new->save();

            $staging = $this->user->current_channel->staging_system;


            //Conditions to broadcast hunting system
            //new system is kspace
            //staging is jspace
            //staging is previous system

            if(!$new->system->isAnoikis && !is_null($staging) && $staging->getKey() == $latest->system->getKey() && $staging->isAnoikis){

                //Check if we have already done this
                $current_hunting = \Cache::get("user.{$this->user->getKey()}.hunting-from", null);

                if(is_null($current_hunting)){
                    //Broadcast new hunting system
                    broadcast(new SetHuntingSystem($new->system, $this->user));
                    //cache for subsequent requests
                    \Cache::remember("user.{$this->user->getKey()}.hunting-from", 60, $new->getKey());
                }
            }

        }

        broadcast(new LocationUpdated($this->character, $location->solar_system_id, $this->user->active_channel));
    }
}
