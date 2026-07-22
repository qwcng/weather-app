<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WeatherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        // return parent::toArray($request);
       return [

            'current' => [
                'temperature' => $this['current']['temperature_2m'],
                'temperature_unit'=>$this['current_units']['temperature_2m'],
                'feels_like' => $this['current']['apparent_temperature'],
                'humidity' => $this['current']['relative_humidity_2m'],
                'weather_code' => $this['current']['weather_code'],
                'is_day' => $this['current']['is_day'],
                'precipitation' => $this['current']['precipitation'],
                'cloud_cover' => $this['current']['cloud_cover'],
                'pressure' => $this['current']['pressure_msl'],
                'fetched_at' => now()->toIso8601String(),
                'latitude'=>$this['latitude'],
                'longitude'=>$this['longitude'],
                

                'wind' => [
                    'speed' => $this['current']['wind_speed_10m'],
                    'direction' => $this['current']['wind_direction_10m'],
                    'gusts' => $this['current']['wind_gusts_10m'],
                ],
            ],

            'today' => [
                'sunrise' => $this['daily']['sunrise'][0],
                'sunset' => $this['daily']['sunset'][0],
                'daylight_duration' => $this['daily']['daylight_duration'][0],
                'sunshine_duration' => $this['daily']['sunshine_duration'][0],
            ],

            'hourly' => collect($this['hourly']['time'])
                ->take(72)
                ->map(function ($time, $index) {

                    return [
                        'time' => $time,
                        'temperature' => $this['hourly']['temperature_2m'][$index],
                        'humidity' => $this['hourly']['relative_humidity_2m'][$index],
                        'weather_code' => $this['hourly']['weather_code'][$index],
                        'precipitation_probability' => $this['hourly']['precipitation_probability'][$index],
                        'wind_speed' => $this['hourly']['wind_speed_10m'][$index],
                    ];
                })
                ->values(),

            'forecast' => collect($this['daily']['time'])
                ->map(function ($date, $index) {

                    return [
                        'date' => $date,
                        'weather_code' => $this['daily']['weather_code'][$index],
                        'temperature_max' => $this['daily']['temperature_2m_max'][$index],
                        'temperature_min' => $this['daily']['temperature_2m_min'][$index],
                        'sunrise' => $this['daily']['sunrise'][$index],
                        'sunset' => $this['daily']['sunset'][$index],
                        'daylight_duration' => $this['daily']['daylight_duration'][$index],
                        'sunshine_duration' => $this['daily']['sunshine_duration'][$index],
                        'precipitation_probability' => $this['daily']['precipitation_probability_max'][$index],
                        'wind_speed' => $this['daily']['wind_speed_10m_max'][$index],
                    ];
                })
                ->values(),
        ];
    }
}