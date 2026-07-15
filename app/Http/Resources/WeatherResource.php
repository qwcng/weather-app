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
                'feels_like' => $this['current']['apparent_temperature'],
                'humidity' => $this['current']['relative_humidity_2m'],
                'condition_code' => $this['current']['weather_code'],
                'is_day' => $this['current']['is_day'],
                'precipitation' => $this['current']['precipitation'],
                'cloud_cover' => $this['current']['cloud_cover'],
                'pressure' => $this['current']['pressure_msl'],
                'wind' => [
                    'speed' => $this['current']['wind_speed_10m'],
                    'direction' => $this['current']['wind_direction_10m'],
                    'gusts' => $this['current']['wind_gusts_10m'],
                ],
            ],
        ];
    }
}
