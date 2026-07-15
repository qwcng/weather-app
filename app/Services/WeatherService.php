<?php
namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class WeatherService{
    

    public function getWeather(float $latitude,float $longitude){
        $response = Http::get(
        "https://api.open-meteo.com/v1/forecast",
        [
            'latitude' => $latitude,
            'longitude' => $longitude,

            'current' => implode(',', [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'weather_code',
                'is_day',
                'precipitation',
                'cloud_cover',
                'pressure_msl',
                'wind_speed_10m',
                'wind_direction_10m',
                'wind_gusts_10m',
            ]),

            'timezone' => "auto",
        ]
        );
        // dd($response->json());
        return $response->json();

    }
}