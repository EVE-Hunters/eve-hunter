<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'application');
Route::view('/{any}', 'application')
    ->where('any', 'login|account|hunting');

Route::get('/system/{system}', [\App\Http\Controllers\Location\LocationController::class, 'getNearSystems']);


Route::prefix('auth/sso')->group(function () {

    Route::get('redirect', [\App\Http\Controllers\Auth\SSoController::class, 'redirect']);

    Route::get('callback', [\App\Http\Controllers\Auth\SSoController::class, 'callback']);

});


Route::middleware(['web', 'auth'])->group(function () {

    Route::get('/logout', function () {
        auth()->logout();

        return redirect('/login');
    });

});
