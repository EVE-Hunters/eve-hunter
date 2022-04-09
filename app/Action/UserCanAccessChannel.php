<?php

namespace App\Action;

use App\Models\Messaging\Channel;
use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class UserCanAccessChannel
{
    use AsAction;

    public function handle(User $user, Channel $channel): bool{
        return
            $channel->user_id === $user->getKey() ||
            ($channel->access->count() > 0 &&
            $channel
                ->access->whereIn('entity_id', $user->entity_ids())->count() > 0);
    }
}
