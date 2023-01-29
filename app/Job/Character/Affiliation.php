<?php

namespace App\Job\Character;

use App\Job\Universe\Names;
use App\Models\Character\CharacterInfo;
use App\Models\Sde\UniverseName;
use Illuminate\Queue\SerializesModels;

class Affiliation extends \LaravelEveTools\EveApi\Jobs\Characters\Affiliation
{

    public $queue = 'character';


	/**
	 * Execute Job
	 * @return mixed
	 */
	public function handle() {
        collect($this->character_ids)->chunk(self::REQUEST_ID_LIMIT)->each(function ($chunk) {
            $this->request_body = $chunk->values()->all();
            $affilitations = $this->retrieve();

            collect($affilitations)->each(function ($affilition) {
                CharacterInfo::updateOrCreate(
                    ['character_id' => $affilition->character_id],
                    [
                        'corporation_id' => $affilition->corporation_id,
                        'alliance_id' => $affilition->alliance_id ?? null,
                    ]
                );
            });
        });
        Names::dispatch()->delay(10);
	}
}
