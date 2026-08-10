<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ExportService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function save(array $data){
        Http::withToken(auth()->user()->versec_token)
            ->post(env('VERSEC_SERVER_URL') . '/api/weather/save', [
                'filename'=> 'WEATHER_RAPORT'.now()->format('d-m-Y_H-i-s') . '.txt',
                'content'=> $this->buildFileContent($data),
                
            ]);
        return response()->json([
            'success' => true,
            'message' => 'Data saved to Versec Drive successfully.',
        ]);
    
    }
    private function buildFileContent(array $data): string
    {
        $city = $data['cityName'] ?? 'Nieznane';
        $region = $data['adminRegion'] ?? '';
        $current = $data['currentWeather'] ?? [];
        $unit = $current['temperature_unit'] ?? '°C';
        $todayDate = now()->toDateString();
        $todayForecast = collect($data['forecast'] ?? [])->firstWhere('date', $todayDate) 
                        ?? ($data['forecast'][0] ?? null);

        $content = "=========================================\n";
        $content .= "   RAPORT POGODOWY: " . mb_strtoupper($city) . ($region ? " ({$region})" : "") . "\n";
        $content .= "   Data wygenerowania: " . now()->format('d.m.Y H:i:s') . "\n";
        $content .= "=========================================\n\n";

        $content .= "--- AKTUALNE WARUNKI ---\n";
        $content .= "Temperatura: " . ($current['temperature'] ?? 'N/A') . " {$unit}\n";
        $content .= "Odczuwalna: " . ($current['feels_like'] ?? 'N/A') . " {$unit}\n";
        $content .= "Wilgotność: " . ($current['humidity'] ?? 'N/A') . "%\n";
        $content .= "Ciśnienie: " . ($current['pressure'] ?? 'N/A') . " hPa\n";
        $content .= "Zachmurzenie: " . ($current['cloud_cover'] ?? 'N/A') . "%\n";
        
        if (isset($current['wind'])) {
            $speed = $current['wind']['speed'] ?? 'N/A';
            $gusts = $current['wind']['gusts'] ?? null;
            $content .= "Wiatr: {$speed} km/h" . ($gusts ? " (porywy do {$gusts} km/h)" : "") . "\n";
        }
        $content .= "\n";

        if ($todayForecast) {
            $content .= "--- PROGNOZA NA DZIŚ (" . $todayForecast['date'] . ") ---\n";
            $content .= "Temp. min / max: " . ($todayForecast['temperature_min'] ?? '-') . "{$unit} / " . ($todayForecast['temperature_max'] ?? '-') . "{$unit}\n";
            $content .= "Prawdopodobieństwo opadów: " . ($todayForecast['precipitation_probability'] ?? '0') . "%\n";
            $content .= "Indeks UV: " . ($todayForecast['uv_index'] ?? 'N/A') . "\n";
            $sunrise = isset($todayForecast['sunrise']) ? substr($todayForecast['sunrise'], 11, 5) : 'N/A';
            $sunset = isset($todayForecast['sunset']) ? substr($todayForecast['sunset'], 11, 5) : 'N/A';
            $content .= "Wschód / Zachód słońca: {$sunrise} / {$sunset}\n";
            $content .= "\n";
        }

        $todayHourly = collect($data['hourly'] ?? [])
            ->filter(fn($item) => isset($item['time']) && str_starts_with($item['time'], $todayDate));

        if ($todayHourly->isNotEmpty()) {
            $content .= "--- PROGNOZA GODZINOWA NA DZIŚ ---\n";
            foreach ($todayHourly as $hour) {
                $time = substr($hour['time'], 11, 5);
                $temp = $hour['temperature'] ?? 'N/A';
                $pop = $hour['precipitation_probability'] ?? 0;
                $wind = $hour['wind_speed'] ?? 'N/A';
                $content .= "{$time} | {$temp}{$unit} | Opady: {$pop}% | Wiatr: {$wind} km/h\n";
            }
        }

        return $content;
    }

}