<?php

namespace App\Providers;

use App\Job\Middleware\CheckEsiStatus;
use Illuminate\Support\ServiceProvider;
use LaravelEveTools\EveApi\Contracts\Middleware\CheckEsiStatusInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CheckEsiStatusInterface::class, CheckEsiStatus::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //$this->app->bind()
    }
}
