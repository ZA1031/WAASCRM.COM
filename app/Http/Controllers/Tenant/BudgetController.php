<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\Lerph;
use App\Http\Controllers\Controller;
use App\Models\Tenant\Budget;
use App\Models\Tenant\BudgetDetail;
use App\Models\Tenant\Catalog;
use App\Models\Tenant\Client;
use App\Models\Tenant\TenantProduct;
use App\Models\Tenant\TenantUser;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index($cid)
    {
        $client = Client::findOrFail($cid);
        return Inertia::render('Tenant/Budgets/BudgetList', [
            'title' => 'Presupuestos de '.$client->company_name,
            'cid' => $cid,
        ]);
    }

    public function list(Request $request, $cid)
    {
        $data = Budget::where('client_id', $cid)->get()->map(function($pr){
            $pr->status_name = $pr->getStatus();
            return $pr;
        });
        
        return $data;
    }

    public function get($cid, $bid){
        $budget = Budget::find($bid);

        ///Products
        $products = [];
        $quantities = explode(',', $budget->quantities);
        foreach (explode(',', $budget->products) as $key => $product) {
            $pr = TenantProduct::find($product);
            if (!$pr) continue;
            for ($i = 0; $i < $quantities[$key]; $i++) $products[] = $pr;
        }

        ///Details
        $details = [];
        foreach ($budget->details as $det)$details[] = ['label' => $det->txt, 'value' => $det->id];

        ///Addresses
        $addresses = [];
        foreach ($budget->client->addresses as $add) $addresses[] = ['label' => $add->full_address, 'value' => $add->id];        

        return ['products' => $products, 'budget' => $budget, 'details' => $details, 'addresses' => $addresses];
    }

    public function create($cid)
    {
        return Inertia::render('Tenant/Budgets/BudgetForm', [
            'title' => 'Agregar Presupuesto',
            'budget' => new Budget(),
            'cid' => $cid,
            'allDetails' => [],
            'products' => TenantProduct::select('name as label', 'id as value', 'inner_prices as prices')->whereIn('id', ALLOWED_PRODUCTS)->where('active', 1)->where('inner_active', 1)->get(),
            'extras' => Catalog::select('name as label', 'id as value')->where('type', 4)->get(),
            'dues' => Lerph::getDuesSelect(),
        ]);
    }

    public function edit($cid, $bid)
    {
        $budget = Budget::find($bid);
        return Inertia::render('Tenant/Budgets/BudgetForm', [
            'title' => 'Editar Presupuesto',
            'budget' => $budget,
            'cid' => $cid,
            'allDetails' => $budget->details,
            'products' => TenantProduct::select('name as label', 'id as value', 'inner_prices as prices')->whereIn('id', ALLOWED_PRODUCTS)->where('active', 1)->where('inner_active', 1)->get(),
            'extras' => Catalog::select('name as label', 'id as value')->where('type', 4)->get(),
            'dues' => Lerph::getDuesSelect(),
        ]);
    }

    public function store(Request $request, $cid)
    {
        $id = $request->id;
        if (empty($id)) $id = 0;
        return $this->upsertData($request, $id, $cid);
    }

    public function upsertData($request, $id, $cid){
        $this->validateForm($request, $id);

        if (empty($request->id)) $budget = new Budget($request->except(['id']));
        else {
            $budget = Budget::find($request->id);
            if ($budget) $budget->fill($request->except(['id']));
            else $budget = new Budget($request->except(['id']));
        }
        $budget->client_id = $cid;
        $budget->products = implode(',', $request->input('products', []));
        $budget->quantities = implode(',', $request->input('quantities', []));
        $budget->save();

        $this->upsertDetails($request, $budget);

        return redirect()->route('budgets.index', $cid)->with('message', 'Datos guardados correctamente.');
    }

    public function destroy($bid)
    {
        $budget = Budget::findOrFail($bid);
        $budget->delete();
        return redirect()->back()->with('message', 'Presupuesto borrado correctamente.');
    }

    private function upsertDetails($request, $budget)
    {
        $savedDetails = $budget->details;
        $uploaded = $request->input('details', []);
        foreach ($uploaded as $det){
            $saved = false;
            foreach ($savedDetails as $sf){
                if ($sf->id == $det['id']) {
                    $saved = true;
                    $sf->fill($det);
                    $sf->save();
                }
            }
            if (!$saved){
                $budget->details()->create([
                    'installation' => $det['installation'],
                    'installation_cost' => $det['installation_cost'],
                    'init_amount' => $det['init_amount'],
                    'last_amount' => $det['last_amount'],
                    'type' => $det['type'],
                    'maintenance' => $det['maintenance'],
                    'extra_id' => $det['extra_id'],
                    'dues' => $det['dues'],
                    'price' => $det['price'],
                    'discount' => $det['discount'],
                    'notes' => $det['notes'],
                    'iva' => $det['iva'],
                ]);
            }
        }
        foreach ($savedDetails as $sa){
            $deleted = true;
            foreach ($uploaded as $det){if ($det['id'] == $sa->id) $deleted = false;}
            if ($deleted) $sa->delete();
        }
    }

    private function validateForm(Request $request, $id){

        return $request->validate([
            'products' => 'required',
        ]);
    }

    public function validateDetailsForm(Request $request){
        $request->validate([
            'price' => ['required'],
            'installation' => ['required'],
            'type' => ['required'],
            'maintenance' => ['required'],
            'dues' => ['required'],
            'iva' => ['required']
        ]);
        return redirect()->back()->with('message', 'Detalles guardados correctamente.');
    }

    ///Actions
    public function reject(Request $request, $bid){
        $budget = Budget::findOrFail($bid);
        if ($budget->status == 0){
            $budget->status = 2;
            $budget->rejection_reason = $request->reason;
            $budget->save();
        }
        
        return redirect()->back()->with('message', 'Presupuesto rechazado correctamente.');
    }

    public function accept(Request $request, $bid){
        $this->validateAcceptForm($request);

        $budget = Budget::findOrFail($bid);

        if ($budget->status == 0){
            $budget->status = 1;
            $budget->save();

            $detail = BudgetDetail::find($request->detail_id);
            $detail->status = 1;
            $detail->save();

            ///Generate Installations
            $quantities = explode(',', $budget->quantities);
            foreach (explode(',', $budget->products) as $key => $product) {
                $pr = TenantProduct::find($product);
                if (!$pr) continue;
                for ($i = 0; $i < $quantities[$key]; $i++){
                    $addr = $request->input('address-'.$product.'-'.$i, 0);
                    $notes = $request->input('notes-'.$product.'-'.$i, '');

                    $detail->installations()->create([
                        'address_id' => $addr,
                        'status' => 0,
                        'notes' => $notes,
                        'product_id' => $product,
                    ]);
                }
            }
        }

        return redirect()->back()->with('message', 'Presupuesto aprobado correctamente.');
    }

    private function validateAcceptForm(Request $request){
        return $request->validate([
            'detail_id' => ['required']
        ]);
    }

    public function downloadBudget($bid){
        $budget = Budget::find($bid);
        $products = [];
        $quantities = explode(',', $budget->quantities);
        foreach (explode(',', $budget->products) as $key => $product) {
            $pr = TenantProduct::find($product);
            if (!$pr) continue;
            for ($i = 0; $i < $quantities[$key]; $i++) $products[] = $pr;
        }

        //$pdf = \PDF::loadView('pdf.budget', ['budget' => $budget, 'products' => $products]);
        //return $pdf->download('presupuesto-'.$budget->id.'.pdf');
    }
}
