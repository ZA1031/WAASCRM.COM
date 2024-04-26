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

class TaskController extends Controller
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

        return Inertia::render('Tenant/Tasks/Task', [
            'title' => 'Tareas',
            'clients' => $clients,
            'users' => $users,
        ]);
    }

    public function edit($task)
    {
        return Task::find($task);
    }

    public function list(Request $request)
    {
        $data = Task::get()->map(function($t){
            $t->date = Lerph::showDateTime($t->date).' - '.Lerph::showDateTime($t->date_end);
            $t->client_full_name = $t->client->full_name;
            return $t;
        });
        
        return $data;
    }

    public function store(Request $request)
    {
       $valid = $this->validateForm($request, $request->id);

        if ($valid){
            if (empty($request->id)) $task = new Task($request->except(['id']));
            else {
                $task = Task::find($request->id);
                if ($task) $task->fill($request->all());
                else $task = new Task($request->except(['id']));
            }
            $task->save();

            return redirect()->back()->with('message', 'Datos guardados correctamente.');
        }
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->back()->with('message', 'Datos guardados correctamente.');
    }

    public function changeStatus(Request $request, $tid)
    {
        $task = Task::find($tid);
        $task->status = $request->status;
        $task->save();
        return redirect()->back()->with('message', 'Datos guardados correctamente.');
    }

    private function validateForm(Request $request, $id){

        return $request->validate([
            'assigned_to' => 'required',
            'date' => 'required|after_or_equal:now',
            'date_end' => 'required|after_or_equal:date',
            'title' => 'required|string|max:190',
            'description' => 'nullable|string|max:500',
        ]);
    }
}
