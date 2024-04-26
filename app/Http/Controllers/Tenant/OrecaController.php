<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\Lerph;
use App\Http\Controllers\Controller;
use App\Models\Tenant\Catalog;
use App\Models\Tenant\Client;
use App\Models\Tenant\Task;
use App\Models\Tenant\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OrecaController extends Controller
{
    public function calculate(Request $request)
    {
        $cost = $request->input('cost');
        $dues = $request->input('dues');
        return ['cost1' => rand(), 'cost2' => rand()];
    }
}
