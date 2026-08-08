<?php

namespace App\Providers;

use App\Socialite\VersecProvider;
use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Contracts\Factory as SocialiteFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $socialite = $this->app->make(SocialiteFactory::class);
        $socialite->extend('versec', function ($app) use ($socialite) {
            $config = $app['config']['services.versec'];
            return $socialite->buildProvider(VersecProvider::class, $config);
        });
    }
}
