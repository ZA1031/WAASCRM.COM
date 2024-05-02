<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Models\Central\AdminCatalog;
use App\Models\Central\Company;
use App\Models\Central\Product;
use App\Models\Central\SparePart;
use App\Models\Tenant\Budget;
use App\Models\Tenant\Catalog;
use App\Models\Tenant\Client;
use App\Models\Tenant\Installation;
use App\Models\Tenant\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Storage;

class DashboardController extends Controller
{
    public function index(){

        $stats = [];
        ///Clientes
        $items = [];
        
        $stats[] = [
            'title' => 'Empresas',
            'icon' => 'UserCheck',
            'items' => [
                ['label' => 'Activas', 'value' => Company::where('status', 1)->count()],
                ['label' => 'Inactivas', 'value' =>  Company::where('status', 0)->count()]
            ]
        ];

        return Inertia::render('Tenant/Dashboard', [
            'stats' => $stats
        ]);
    }
}
