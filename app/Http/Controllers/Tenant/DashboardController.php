<?php

namespace App\Http\Controllers\Tenant;

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
        Catalog::where('type', 2)->get()->each(function($item) use (&$items){
            $items[] = ['label' => $item->name, 'value' => Client::where('status_id', $item->id)->where('is_client', 1)->count(), 'link' => route('clients', ['st' => $item->id])];
        });
        $stats[] = [
            'title' => 'Clientes',
            'icon' => 'UserCheck',
            'items' => $items
        ];

        ///Contactos
        $items = [];
        Catalog::where('type', 3)->get()->each(function($item) use (&$items){
            $items[] = ['label' => $item->name, 'value' => Client::where('status_id', $item->id)->where('is_client', 0)->count(), 'link' => route('contacts', ['st' => $item->id])];
        });
        $stats[] = [
            'title' => 'Contactos',
            'icon' => 'UserPlus',
            'items' => $items
        ];

        ///Tareas
        $stats[] = [
            'title' => 'Tareas',
            'icon' => 'Database',
            'items' => [
                ['label' => 'Pendientes', 'value' => Task::where('status', 0)->count(), 'link' => route('tasks', ['st' => 0])],
                ['label' => 'Completadas', 'value' =>  Task::where('status', 1)->count(), 'link' => route('tasks', ['st' => 1])],
                ['label' => 'Canceladas', 'value' =>  Task::where('status', 2)->count(), 'link' => route('tasks', ['st' => 2])],
            ]
        ];

        ///Instalaciones
        $stats[] = [
            'title' => 'Instalaciones',
            'icon' => 'Tool',
            'items' => [
                ['label' => 'P. Asignar', 'value' => Installation::where('is_maintenance', 0)->whereNotNull('assigned_to')->whereIn('status', [0,3])->count(), 'link' => route('installations.pendings')],
                ['label' => 'Pendientes', 'value' => Installation::where('is_maintenance', 0)->where('status', 0)->count(), 'link' => route('installations')],
                ['label' => 'Finalizadas', 'value' =>  Installation::where('is_maintenance', 0)->where('status', 1)->count(), 'link' => route('installations.all', ['st' => 1])],
                ['label' => 'Rechazadas', 'value' =>  Installation::where('is_maintenance', 0)->where('status', 2)->count(), 'link' => route('installations.all', ['st' => 2])],
                ['label' => 'Pospuestas', 'value' =>  Installation::where('is_maintenance', 0)->where('status', 3)->count(), 'link' => route('installations.all', ['st' => 3])],
            ]
        ];

        ///Mantenimientos
        $stats[] = [
            'title' => 'Mantenimientos',
            'icon' => 'Layers',
            'items' => [
                ['label' => 'P. Asignar', 'value' => Installation::where('is_maintenance', 1)->whereNotNull('assigned_to')->whereIn('status', [0,3])->count(), 'link' => route('maintenances.pendings')],
                ['label' => 'Pendientes', 'value' => Installation::where('is_maintenance', 1)->where('status', 0)->count(), 'link' => route('maintenances')],
                ['label' => 'Finalizadas', 'value' =>  Installation::where('is_maintenance', 1)->where('status', 1)->count(), 'link' => route('maintenances.all', ['st' => 1])],
                ['label' => 'Rechazadas', 'value' =>  Installation::where('is_maintenance', 1)->where('status', 2)->count(), 'link' => route('maintenances.all', ['st' => 2])],
                ['label' => 'Pospuestas', 'value' =>  Installation::where('is_maintenance', 1)->where('status', 3)->count(), 'link' => route('maintenances.all', ['st' => 3])],
            ]
        ];

        ///Propuestas
        $stats[] = [
            'title' => 'Propuestas',
            'icon' => 'FileText',
            'items' => [
                ['label' => 'Pendientes', 'value' => Budget::where('status', 0)->count()],
                ['label' => 'Aceptados', 'value' =>  Budget::where('status', 1)->count()],
                ['label' => 'Rechazados', 'value' =>  Budget::where('status', 2)->count()]
            ]
        ];

        return Inertia::render('Tenant/Dashboard', [
            'stats' => $stats
        ]);
    }
}
