<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use function Pest\Laravel\json;

class WeatherController extends Controller
{
    //

    public function getWeather(){
        $weather = Http::get('https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&daily=weather_code,sunrise,sunset,daylight_duration,sunshine_duration,temperature_2m_max,temperature_2m_min,rain_sum&hourly=temperature_2m,relative_humidity_2m,weather_code,uv_index,is_day,rain,cloud_cover,visibility,sunshine_duration&current=temperature_2m&timezone=auto');
        $response =$weather->json();
        return response()->json($response); 
    }
}