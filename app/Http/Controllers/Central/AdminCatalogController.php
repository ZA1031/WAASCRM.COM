<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Models\Central\AdminCatalog;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminCatalogController extends Controller
{
    public function index($type)
    {
        $related = in_array($type, [2, 4]) ? AdminCatalog::select('name as label', 'id as value')->where('type', $type == 2 ? 1 : 3)->get() : null;
        return Inertia::render('Central/Catalog', ['title' => $this->getTitle($type), 'type' => $type, 'related' => $related]);
    }

    public function get($type, $adminCatalog)
    {
        return AdminCatalog::find($adminCatalog);
    }

    public function list(Request $request, $type)
    {
        $data = AdminCatalog::where('type', $type)->get()->map(function($catalog){
            $catalog->extra_array = $catalog->getExtraData();
            return $catalog;
        });
        
        return $data;
    }

    public function store($type, Request $request)
    {
        $request->merge(['type' => $type]);
        
        $valid = $this->validateForm($request, $request->id);

        if ($valid){
            if (empty($request->id)) $cc = new AdminCatalog($request->except(['id']));
            else {
                $cc = AdminCatalog::find($request->id);
                if ($cc) $cc->type == 1 ? $cc->fill($request->except(['extra_2'])) : $cc->fill($request->all());
                else $cc = new AdminCatalog($request->except(['id']));
            }
            $cc->extra_1 = implode(',', $request->input('extra_1', []));
            $cc->save();

            return redirect()->back()->with('message', 'Datos guardados correctamente.');
        }
    }

    public function destroy(AdminCatalog $adminCatalog)
    {
        $adminCatalog->delete();
        return redirect()->back()->with('message', 'Datos guardados correctamente.');
    }

    private function getTitle($id)
    {
        switch ($id) {
            case 1:
                return 'Familias';
            case 2:
                return 'Grupo de Familias';
            case 3:
                return 'Caracteristicas';
            case 4:
                return 'Categoria de Productos';
            case 5:
                return 'Tipos de Familia';
        }
    }

    private function validateForm(Request $request, $id){
        $t = $request->input('type');
        $c = $request->input('name');
        $ct = AdminCatalog::where('name', $c)->where('type', $t)->first();
        
        if (($ct && $ct->id != $id)) throw ValidationException::withMessages(['name' => 'Ya existe un item con ese nombre']);

        return $request->validate([
            'name' => 'required|max:100',
            'type' => 'required'
        ]);
    }

    public function getAttributes($cid)
    {
        $catalog = AdminCatalog::findOrFail($cid);

        return $catalog ? $catalog->getExtraData() : [];
    }
}
