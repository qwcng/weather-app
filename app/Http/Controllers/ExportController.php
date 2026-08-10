<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExportService;

class ExportController extends Controller
{
    private ExportService $ExportService;
    public function __construct($ExportService)
    {
        $this->ExportService = $ExportService;
        // throw new \Exception('Not implemented');
    }
    public function saveToVersecDrive(){
        $this->ExportService->save();

    }
}
