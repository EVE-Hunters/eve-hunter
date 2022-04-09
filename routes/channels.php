<?php

use App\Models\Messaging\Channel;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/



Broadcast::channel('User.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id;
});

/*Broadcast::channel('location', fn() => auth()->check());

Broadcast::channel('hunting', fn() => true, ['auth']);

Broadcast::channel('hunting.{channel}', function(\App\Models\User $user, Channel $channel){
    (new \App\Action\UserCanAccessChannel())->handle($user, $channel);
});*/

Broadcast::channel('hunters.{channel}', function (\App\Models\User $user, Channel $channel) {
    if (\App\Action\UserCanAccessChannel::run($user, $channel)) {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'characters' => $user->characters
        ];
    }
});
