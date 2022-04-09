<?php

namespace App\Job\Character;

use App\Job\Universe\Names;
use App\Models\Character\CharacterInfo;
use Illuminate\Queue\SerializesModels;

class Character extends \LaravelEveTools\EveApi\Jobs\Characters\Character
{
    use SerializesModels;

    const UNIVERSE_NAME_DElAY = 10;

    public $queue = 'character';

    public bool $force;

    public function __construct(int $character_id, $force = false)
    {
        parent::__construct($character_id);
        $this->force = $force;
    }

    public function handle()
    {
        $data = $this->retrieve();

        if($this->skipIfTrue($data)) return;

        /* @var \App\Models\Character\CharacterInfo $model */
        $model = CharacterInfo::firstOrNew([
            'character_id' => $this->getCharacterId()
        ], [
            'name' => $data->name,
        ]);

        $model->corporation_id = $data->corporation_id;
        $model->alliance_id = $data->alliance_id ?? null;
        $model->save();


        Names::dispatch()->delay(self::UNIVERSE_NAME_DElAY);
    }
}
