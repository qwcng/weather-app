<?php
namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class WeatherService{
    

    public function getWeather(float $latitude = 52.229,float $longitude=21.012, string $temp,string $wind, string $time){
        $response = Http::get(
        "https://api.open-meteo.com/v1/forecast",
        [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'temperature_unit'=>$temp,
           
            // if($wind !="kmh"){
            //     'wind_speed_unit'=>$wind,
            // }
           
            

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

            'hourly' => implode(',', [
                'temperature_2m',
                'relative_humidity_2m',
                'weather_code',
                'precipitation_probability',
                'wind_speed_10m',
            ]),

            'daily' => implode(',', [
                'weather_code',
                'temperature_2m_max',
                'temperature_2m_min',
                'sunrise',
                'sunset',
                'daylight_duration',
                'sunshine_duration',
                'precipitation_probability_max',
                'wind_speed_10m_max',
            ]),

            'forecast_days' => 14,
            'timezone' => 'auto',
        ]
        );
        // dd($response->json());
        return $response->json();

    }
    public function searchCity(string $city){
        $cities= Http::get('https://geocoding-api.open-meteo.com/v1/search',
        [   
            'name'=>$city,
            'count' => 10,
            'language' => 'pl',
            'format' => 'json',
        ]);
        return $cities->json();

    }
}