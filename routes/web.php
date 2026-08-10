<?php

use App\Http\Controllers\ExportController;
use App\Http\Controllers\VersecController;
use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main');
})->name('home');


Route::get('/profile', function () {
    return Inertia::render('Main');
})->name('home/settings');
Route::get('/auth/versec', [VersecController::class, 'redirect'])->name('versec.redirect'); 
Route::get('/auth/versec/callback', [VersecController::class, 'callback']);
Route::middleware(['auth'])->group(function () {
Route::post('/saveToVersecDrive',[ExportController::class, 'saveToVersecDrive']);
});


// Route::middleware(['auth'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/getWeather', [WeatherController::class,'index']);
Route::get('/searchCity',[WeatherController::class,'searchCity']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';