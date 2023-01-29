<?php

namespace App\Action\Channels;

use App\Exceptions\NotChannelOwnerException;
use App\Http\Controllers\ChannelController;
use App\Job\Character\Character;
use App\Models\Character\CharacterInfo;
use App\Models\Messaging\Channel;
use App\Models\Messaging\ChannelAccess;
use App\Models\Sde\UniverseName;
use Illuminate\Support\Arr;
use Lorisleiva\Actions\Concerns\AsAction;

class SyncChannelAccess
{
    use AsAction;

    public function handle(Channel $channel, $access = []){


        $currentAccess = $channel->access;
        $currentAccessIds = $currentAccess->pluck('entity_id')->flatten();
        $accessId = collect($access)->pluck('entity_id')->flatten();


        $toRemove = $currentAccessIds->diff($accessId);
        $toAdd = $accessId->diff($currentAccessIds);

        if($toRemove->count() > 0){
            ChannelAccess::query()->whereIn('entity_id', $toRemove->toArray())->delete();
        }

        if($toAdd->count() > 0){
            $accessAdd = array_filter($access, function ($item) use($toAdd) {
                return $toAdd->contains($item['entity_id']);
            });

            collect($accessAdd)->each(function ($item) use ($channel) {

                if ($item['type'] == 'character') {

                    $character = CharacterInfo::updateOrCreate([
                        'character_id' => $item['entity_id']
                    ], [
                        'name' => $item['name'],
                        'corporation_id' => Arr::get($item, 'corporation_id'),
                        'alliance_id' => Arr::get($item, 'alliance_id', null)
                   ]);

                    Character::dispatch($item['entity_id']);

                    $channel->access()->create([
                        'entity_id'     => $item['entity_id'],
                        'entity_type'   => get_class($character)
                    ]);

                }else{

                    $name = UniverseName::firstOrCreate([
                        'entity_id' => $item['entity_id'],
                    ], [
                        'category'  => $item['type'],
                        'name'      => $item['name']
                    ]);

                    $channel->access()->create([
                        'entity_id' => $item['entity_id'],
                        'entity_type' => get_class($name),
                    ]);
                }
            });
        }

    }
}
