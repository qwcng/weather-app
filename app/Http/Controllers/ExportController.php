<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExportService;

class ExportController extends Controller
{
    private ExportService $ExportService;
    public function __construct(ExportService $ExportService)
    {
        $this->ExportService = $ExportService;
        // throw new \Exception('Not implemented');
    }
    public function saveToVersecDrive(Request $request){
        $data = $request->validate([
            'cityName' => 'required|string',
            'adminRegion' => 'nullable|string',
            'currentWeather' => 'required|array',
            'forecast' => 'nullable|array',
            'hourly' => 'nullable|array',
            'timeFormat' => 'nullable|string',
            'temperatureUnit' => 'nullable|string',
        ]);
        $result =$this->ExportService->save($data);
        return response()->json($result);

    }
}