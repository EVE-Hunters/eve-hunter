<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\EsiController;
use App\Http\Controllers\HuntingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('login', [App\Http\Controllers\HomeController::class, 'loginView'])->name('login');

Route::middleware(['web', 'auth'])->group(function () {

    Route::post('token/{token}/refresh', [AccountController::class, 'refreshAccessToken'])
        ->name('token.refresh');

    Route::group(
    [],
        function () {
            Route::get('/', function () {
                return Inertia::render('Home');
            });

            Route::get('/home', function () {
                return Inertia::render('Home');
            });

            Route::get('/esi/search', [EsiController::class, 'search'])
                ->name('esi.search');

            Route::get('/esi/search/refresh', [EsiController::class, 'refreshSearchResults'])
                ->name('esi.search.refresh');

            Route::group(['prefix' => 'characters'], function () {
                Route::get('/', [AccountController::class, 'index'])
                    ->name('inertia.characters');
            });

            Route::get('/channels', [ChannelController::class, 'index'])
                ->name('inertia.channels');

            Route::get('/hunt', [HuntingController::class, 'index'])
                ->name('inertia.hunt');


            Route::post('account/channel/{channel}/set', [AccountController::class, 'setActiveChannel'])
                ->name('account.channel.set');

            Route::post('hunters/set', [AccountController::class, 'syncHuntingCharacters'])
                ->name('account.hunters.set');

            Route::post('/hunters/{character}/primary', [AccountController::class, 'setPrimaryHunter'])
                ->name('account.hunter.primary');

            Route::group([
                'prefix' => 'channel'
            ], function () {

                Route::get('/{channel}/edit', [ChannelController::class, 'edit'])
                    ->name('inertia.channel.edit');

                Route::post('/{channel}/edit', [ChannelController::class, 'update'])
                    ->name('channel.update');

                Route::get('/create', [ChannelController::class, 'add'])
                    ->name('inertia.channel.create');

                Route::post('create', [ChannelController::class, 'create'])
                    ->name('channel.create');

                Route::delete('/{channel}', [ChannelController::class, 'delete'])
                    ->name('inertia.channel.delete');
            }
            );
        }
    );

});




