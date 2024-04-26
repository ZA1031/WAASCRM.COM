<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\Lerph;
use App\Http\Controllers\Controller;
use App\Models\Tenant\Catalog;
use App\Models\Tenant\Client;
use App\Models\Tenant\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Tenant/Clients/ClientList', [
            'title' => $this->isClientPage() ? 'Clientes' : 'Contactos', 
            'isClient' => $this->isClientPage()
        ]);
    }

    public function list(Request $request)
    {
        $data = Client::where('is_client', $this->isClientPage())->get()->map(function($cl){
            $cl->total_comments = $cl->comments->count();
            $cl->origin;
            return $cl;
        });
        
        return $data;
    }

    public function create()
    {
        $isClient = $this->isClientPage();
        return Inertia::render('Tenant/Clients/ClientForm', [
            'title' => 'Agregar '. ($isClient ? 'Cliente' : 'Contacto'),
            'isClient' => $isClient,
            'client' => new Client(),
            'statuses' => Catalog::select('name as label', 'id as value')->where('type', $isClient ? 2 : 3)->get(),
            'origins' => Catalog::select('name as label', 'id as value')->where('type', 1)->get(),
            'addresses' => []
        ]);
    }

    public function edit($uid)
    {
        $client = Client::find($uid);
        $isClient = $this->isClientPage();
        return Inertia::render('Tenant/Clients/ClientForm', [
            'title' => 'Editar '.($isClient ? 'Cliente' : 'Contacto'),
            'isClient' => $isClient,
            'client' => $client,
            'statuses' => Catalog::select('name as label', 'id as value')->where('type', $isClient ? 2 : 3)->get(),
            'origins' => Catalog::select('name as label', 'id as value')->where('type', 1)->get(),
            'addresses' => $client->addresses
        ]);
    }

    public function show($uid)
    {
        $client = Client::find($uid);
        $isClient = $this->isClientPage();
        $client->comments->map(function($c){
            $c->user;
            $c->date = Lerph::showDateTime($c->created_at);
            return $c;
        });
        $client->budgets->map(function($b){
            $b->date = Lerph::showDateTime($b->created_at);
            $b->status;
            $b->status_name = $b->getStatus();
            $b->details;
            return $b;
        });
        $client->tasks->map(function($t){
            $t->date = Lerph::showDateTime($t->date);
            $t->date_end = Lerph::showDateTime($t->date_end);
            $t->user;
            return $t;
        });

        $client->origin;
        $client->status;
        return Inertia::render('Tenant/Clients/ClientView', [
            'title' => 'Ver '.($isClient ? 'Cliente' : 'Contacto'),
            'isClient' => $isClient,
            'client' => $client,
            'addresses' => $client->addresses
        ]);
    }

    public function store(Request $request)
    {
        $id = $request->id;
        if (empty($id)) $id = 0;
        return $this->upsertData($request, $id);
    }

    public function upsertData($request, $id){
        $this->validateForm($request, $id);

        if (empty($request->id)) $client = new Client($request->except(['id']));
        else {
            $client = Client::find($request->id);
            if ($client) $client->fill($request->except(['id', 'logo']));
            else $client = new Client($request->except(['id']));
        }
        $client->is_client = $this->isClientPage() ? 1 : 0;
        $client->save();

        ///Save Logo
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $name = $file->hashName();
            $file->storeAs(tenant('id'), $name, 'clients');
            $client->logo = $name;
            $client->save();
        }

        $this->upsertAddresses($request, $client);

        return redirect()->route($this->isClientPage() ? 'clients' : 'contacts')->with('message', 'Datos guardados correctamente.');
    }

    public function destroy($part)
    {
        $client = Client::findOrFail($part);
        $client->delete();
        return redirect()->back()->with('message', 'Cliente borrado correctamente.');
    }

    private function upsertAddresses($request, $client)
    {
        $savedAddresses = $client->addresses;
        $uploaded = $request->input('addresses', []);
        foreach ($uploaded as $addr){
            $saved = false;
            foreach ($savedAddresses as $sf){
                if ($sf->id == $addr['id']) {
                    $saved = true;
                    $sf->name = $addr['name'];
                    $sf->contact_name = $addr['contact_name'];
                    $sf->contact_phone = $addr['contact_phone'];
                    $sf->full_address = $addr['full_address'];
                    $sf->street = $addr['street'];
                    $sf->number = $addr['number'];
                    $sf->door = $addr['door'];
                    $sf->urb = $addr['urb'];
                    $sf->postal_code = $addr['postal_code'];
                    $sf->city = $addr['city'];
                    $sf->province = $addr['province'];
                    $sf->country = $addr['country'];
                    $sf->lat = $addr['lat'];
                    $sf->long = $addr['long'];
                    $sf->notes = $addr['notes'];
                    $sf->save();
                }
            }
            if (!$saved){
                $client->addresses()->create([
                    'name' => $addr['name'],
                    'contact_name' => $addr['contact_name'],
                    'contact_phone' => $addr['contact_phone'],
                    'full_address' => $addr['full_address'],
                    'street' => $addr['street'],
                    'number' => $addr['number'],
                    'door' => $addr['door'],
                    'urb' => $addr['urb'],
                    'postal_code' => $addr['postal_code'],
                    'city' => $addr['city'],
                    'province' => $addr['province'],
                    'country' => $addr['country'],
                    'lat' => $addr['lat'],
                    'long' => $addr['long'],
                    'notes' => $addr['notes'],
                ]);
            }
        }
        foreach ($savedAddresses as $sa){
            $deleted = true;
            foreach ($uploaded as $addr){if ($addr['id'] == $sa->id) $deleted = false;}
            if ($deleted) $sa->delete();
        }
    }

    private function validateForm(Request $request, $id){
        if (empty($request->input('phone')) && empty($request->input('email'))) throw ValidationException::withMessages(['phone' => 'Por favor ingrese el email o teléfono.']);

        return $request->validate([
            'company_name' => 'required|max:191',
            'status_id' => 'required',
            'external_id' => 'max:191|unique:clients,external_id,'.$id,
        ]);
    }

    private function isClientPage()
    {
        return strstr(request()->route()->uri(), 'clients') !== false;
    }

    public function convertClient(Request $request, $cid)
    {
        $client = Client::findOrFail($cid);
        $client->is_client = 1;
        $client->save();
        return redirect()->back()->with('message', 'Cliente generado correctamente.');
    }

    public function getAddresses($cid)
    {
        $client = Client::findOrFail($cid);
        return $client->addresses;
    }

    public function opportunities()
    {
        $isClient = $this->isClientPage();
        $statuses = Catalog::where('type', $isClient ? 2 : 3)->where('extra_1', '!=', 1)->get();
        return Inertia::render('Tenant/Clients/Opportunities', [
            'title' =>  $isClient ? 'Clientes' : 'Contactos', 
            'isClient' => $isClient,
            'statuses' => $statuses
        ]);
    }

    public function updateStatus(Request $request, $cid)
    {
        $client = Client::findOrFail($cid);
        $client->status_id = $request->status;
        $client->save();
        return redirect()->back()->with('message', 'Datos guardados correctamente.');
    }
}
