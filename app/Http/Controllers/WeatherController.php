<?php

namespace App\Http\Controllers;

use App\Http\Resources\WeatherResource;
use App\Services\WeatherService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use function Pest\Laravel\json;

class WeatherController extends Controller
{
    //
    private WeatherService $weatherService;
    public function __construct(WeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }
    public function index(Request $request){
        // $request->validate(
        //     [
        //         "latitude"=>"float",
        //         "longitude"=>"float|s"
        //     ]
        //     );
        if(!$request->input('latitude') && !$request->input('longitude')){
            $latitude = 52.229;
            $longitude= 21.012; 
        }
        else{
          $latitude = $request->input('latitude');
          $longitude= $request->input('longitude');
          $temp =$request->input('temp','celsius');
          $wind =$request->input('wind',"kmh");
          $time=$request->input('time');
        }
        $weather = $this->weatherService->getWeather($latitude,$longitude,$temp,$wind,$time);
        return new WeatherResource($weather);
    }
    public function searchCity(Request $request){
        $request->validate(
            [   
                "city"=>'string'
            ]
            );
        $city = $request->input('city');
        return $this->weatherService->searchCity($city);

    
    }

    // public function getWeather(){
    //     // $weather= Http::get('https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,cloud_cover,visibility,uv_index,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&forecast_days=14&timezone=auto');
    //     // $response =$weather->json();
    //     // return response()->json($response); 
    //     $service = new WeatherService();

    // }
}