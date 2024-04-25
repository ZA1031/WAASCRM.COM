<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Central\AdminCatalog;
use App\Models\Central\Product;
use App\Models\Central\SparePart;
use App\Models\Tenant\Client;
use App\Models\Tenant\Installation;
use App\Models\Tenant\Material;
use App\Models\Tenant\TenantProduct;
use App\Models\Tenant\TenantUser;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Storage;

class InstallationController extends Controller
{
    public function index()
    {
        return $this->showIndex('Instalaciones pendientes', 0);
    }

    public function pending()
    {
        return $this->showIndex('Instalaciones pendientes de Asignar', 1);
    }

    public function allData()
    {
        return $this->showIndex('Instalaciones', 2);
    }

    private function showIndex($title, $pending)
    {
        $tecnics = TenantUser::select('name as label', 'last_name', 'id as value')->where('rol_id', 5)->get()->map(function($t){
            $t->label = $t->label . ' ' . $t->last_name;
            return $t;
        });

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
        
        
        return Inertia::render('Tenant/Installations/InstallationList', [
            'title' => $title,
            'pending' => $pending,
            'tecnics' => $tecnics,
            'clients' => $clients,
            'products' => TenantProduct::select('name as label', 'id as value', 'inner_prices as prices')->whereIn('id', ALLOWED_PRODUCTS)->where('active', 1)->where('inner_active', 1)->get(),
        ]);
    }

    public function list(Request $request)
    {
        $pending = $request->input('pending', 0);
        $query = Installation::query();
        if ($pending == 1) $query->whereNull('assigned_to');
        else if ($pending == 0) $query->whereNotNull('assigned_to');
        $data = $query->get()->map(function($inst){
            $inst->client_data = $inst->client;
            $inst->address = $inst->address;
            return $inst;
        });
        
        return $data;
    }

    public function edit(Installation $installation)
    {
        return Inertia::render('Tenant/Installations/InstallationForm', [
            'title' => 'Realizar Instalación',
            'installation' => $installation,
            'allMaterials' => Material::select('name as label', 'id as value')->where('active', 1)->get(),
            'materials' => []
        ]);
    }

    public function create(Request $request)
    {
        $this->validateFormCreate($request);
        $installation = new Installation($request->all());
        $installation->save();
        return redirect()->route('installations')->with('message', 'Instalación creada correctamente.');
    }

    public function assign(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'assigned_to' => 'required',
            'installation_date' => 'required|date_format:Y-m-d\TH:i|after_or_equal:now',
            'hours' => 'required',
        ]);

        $installation = Installation::find($request->id);
        $installation->assigned_to = $request->assigned_to;
        $installation->installation_date = $request->installation_date;
        $installation->hours = $request->hours;
        $installation->save();
        return redirect()->back()->with('message', 'Instalación asignada correctamente.');
    }

    public function store(Request $request)
    {
        $id = $request->id;
        $installation = Installation::find($id);
        if (empty($id) || !$installation) return redirect()->route('installations')->with('message', 'Error');
        return $this->upsertData($request, $installation);
    }

    public function upsertData($request, $installation){
        $this->validateForm($request, $installation->id);
        $installation->fill($request->all());
        $installation->save();

        $this->upsertMaterials($request, $installation);
        $this->upsertParts($request, $installation);

        $this->upsertFiles($request, $installation, $installation->files0, 'files0', 0);
        $this->upsertFiles($request, $installation, $installation->files1, 'files1', 1);
        $this->upsertFiles($request, $installation, $installation->files2, 'files2', 2);
        $this->upsertFiles($request, $installation, $installation->files3, 'files3', 3);

        return redirect()->route('installations')->with('message', 'Datos guardados correctamente.');        
    }

    public function destroy(Installation $installation)
    {
        $installation->delete();
        return redirect()->back()->with('message', 'Instalación borrada correctamente.');
    }

    private function validateForm(Request $request, $id){
        return $request->validate([

        ]);
    }

    private function validateFormCreate(Request $request){
        return $request->validate([
            'client_id' => 'required',
            'product_id' => 'required',
            'address_id' => 'required',
            'installation_date' => 'required|date_format:Y-m-d\TH:i|after_or_equal:now',
            'hours' => 'required',
            'assigned_to' => 'required',
        ]);
    }

    private function upsertMaterials($request, $installation)
    {
        $savedObjects = $installation->materials;
        $uploaded = $request->input('materials', []);
        foreach ($uploaded as $mat){
            $saved = false;
            foreach ($savedObjects as $so){
                if ($so->id == $mat['id']) {
                    $saved = true;
                    $so->save();
                }
            }
            if (!$saved){
                $installation->materials()->create($mat);
            }
        }
        foreach ($savedObjects as $so){
            $deleted = true;
            foreach ($uploaded as $mat){if ($mat['id'] == $so->id) $deleted = false;}
            if ($deleted) $so->delete();
        }
    }

    private function upsertParts($request, $installation)
    {
        $savedObjects = $installation->parts;
        $uploaded = $request->input('parts', []);
        foreach ($uploaded as $mat){
            $saved = false;
            foreach ($savedObjects as $so){
                if ($so->id == $mat['id']) {
                    $saved = true;
                    $so->save();
                }
            }
            if (!$saved){
                $installation->parts()->create($mat);
            }
        }
        foreach ($savedObjects as $so){
            $deleted = true;
            foreach ($uploaded as $mat){if ($mat['id'] == $so->id) $deleted = false;}
            if ($deleted) $so->delete();
        }
    }

    private function upsertFiles($request, $installation, $savedFiles, $key, $type)
    {
        $uploaded = $request->input($key, []);
        foreach ($uploaded as $n => $file){
            $saved = false;
            foreach ($savedFiles as $sf){
                if ($sf->id == $file['id']) {
                    $saved = true;
                    $sf->title = $file['title'];
                    $sf->image_type = $file['image_type'];
                    $sf->save();
                }
            }
            if (!$saved){
                $installation->files()->create([
                    'type' => $type,
                    'file' => $file['file'],
                    'title' => $file['title'],
                    'size' => $file['size'],
                    'image_type' => $file['image_type']
                ]);

                Storage::disk('installations')->put(tenant('id').'/'.$installation->id . '/' . $file['file'], Storage::disk('tmp')->get($file['file']));
                Storage::disk('tmp')->delete($file['file']);
            }
        }
        foreach ($savedFiles as $sf){
            $deleted = true;
            foreach ($uploaded as $file){if ($file['id'] == $sf->id) $deleted = false;}
            if ($deleted){
                $sf->delete();

                Storage::disk('installations')->delete(tenant('id').'/'.$installation->id . '/' . $sf->file);
            }
        }
    }
}
