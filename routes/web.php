<?php

use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Weather');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/getWeather', [WeatherController::class,'index']);
Route::get('/searchCity',[WeatherController::class,'searchCity']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';