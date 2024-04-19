<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\Lerph;
use App\Http\Controllers\Controller;
use App\Models\Tenant\TenantProduct;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Tenant/Products/ProductList', ['title' => 'Productos', 'allowed' => ALLOWED_PRODUCTS]);
    }

    public function list(Request $request)
    {
        $data = TenantProduct::whereIn('id', ALLOWED_PRODUCTS)->where('active', 1)->get()->map(function($pr){
            $pr->main_image = $pr->getMainImage();
            return $pr;
        });
        
        return $data;
    }

    public function edit($pid)
    {
        $prod = TenantProduct::find($pid);
        return Inertia::render('Tenant/Products/ProductForm', [
            'title' => 'Editar Producto',
            'product' => $prod,
            'familyName' => $prod->family->name ?? '',
            'dues' => Lerph::getDues(),
            'attributes' => $prod->attributes,
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

        $product = TenantProduct::find($request->id);
        $product->fill($request->except(['id']));
        $product->inner_prices = json_encode($request->input('inner_prices'));
        $product->inner_active = $request->input('inner_active') ? 1 : 0;
        $product->save();

        return redirect()->route('prs')->with('message', 'Datos guardados correctamente.');
    }

    public function changeStatus($id){
        $product = TenantProduct::find($id);
        $product->inner_active = $product->inner_active ? 0 : 1;
        $product->save();
        return redirect()->back()->with('message', 'Estado cambiado correctamente.');
    }

    private function validateForm(Request $request, $id){
        return $request->validate([
        ]);
    }

    public function pdf($id){
        $product = TenantProduct::find($id);
        //$pdf = \PDF::loadView('pdf.product', ['product' => $product]);
        //return $pdf->download('product_'.$product->id.'.pdf');
    }
}
