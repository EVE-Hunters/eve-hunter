<?php

namespace App\Job\Universe;

use App\Enums\EveEntityClassification;

use App\Models\Character\CharacterInfo;
use App\Models\Sde\UniverseName;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class Names extends \LaravelEveTools\EveApi\Jobs\Universe\Names implements ShouldBeUnique
{
    private $items_id_limit = 1000;

    public $tags = ['default'];

    public $queue = 'default';

    public function handle()
    {
        $existing_ids = UniverseName::select('entity_id')
            ->distinct()
            ->get()
            ->pluck('entity_id');

        $entity_ids = collect();

        $entity_ids->push(CharacterInfo::select('corporation_id')
            ->whereNotNull('corporation_id')
            ->distinct()
            ->get()
            ->pluck('corporation_id')
            ->toArray());

        $entity_ids->push(CharacterInfo::select('alliance_id')
            ->whereNotNull('alliance_id')
            ->distinct()
            ->get()
            ->pluck('alliance_id')
            ->toArray());

        $entity_ids->flatten()->diff($existing_ids)->values()->chunk($this->items_id_limit)->each(function($chunk){
            $this->request_body = collect($chunk->values()->all())->unique()->values()->all();

            $names = $this->retrieve();

            collect($names)->each(function($uname){
               UniverseName::firstOrNew([
                   'entity_id'=>$uname->id,
               ], [
                   'name'   => $uname->name,
                   'category'=> EveEntityClassification::from($uname->category)
               ])->save();
            });
        });
    }
}
