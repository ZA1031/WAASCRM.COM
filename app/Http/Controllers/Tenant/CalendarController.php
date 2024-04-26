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

class CalendarController extends Controller
{
    public function index()
    {
        $clients = Client::get()->map(function($t){
            $t->label = $t->full_name;
            $t->value = $t->id;
            $t->addresses = $t->addresses->map(function($a){
                $a->label = $a->full_address;
                $a->value = $a->id;
                return $a;
            });
            return $t;
        });

        $users = TenantUser::select('name as label', 'last_name', 'id as value')->get()->map(function($t){
            $t->label = $t->label . ' ' . $t->last_name;
            return $t;
        });

        return Inertia::render('Tenant/Tasks/Calendar', [
            'title' => 'Agenda',
            'clients' => $clients,
            'users' => $users,
        ]);
    }

    public function list(Request $request)
    {
        $tasks = Task::get();
        $data = [];
        foreach ($tasks as $task) {
            $data[] = [
                'id' => $task->id,
                'title' => $task->title,
                'start' => $task->date,
                'end' => $task->date_end,
            ];
        }

        return $data;
    }
}
