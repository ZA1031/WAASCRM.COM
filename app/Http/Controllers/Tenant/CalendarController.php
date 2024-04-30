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
        return Inertia::render('Tenant/Tasks/Calendar', [
            'title' => 'Agenda'
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
                'type' => $task->type,
            ];
        }

        return $data;
    }
}
