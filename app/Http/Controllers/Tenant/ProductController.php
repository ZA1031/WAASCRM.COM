<?php

namespace App\Http\Controllers\Tenant;

use App\Helpers\Lerph;
use App\Http\Controllers\Controller;
use App\Models\Central\ProductAttr;
use App\Models\Central\SparePart;
use App\Models\Tenant\TenantProduct;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
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

        // PARTES
        $pids = explode(',', $product->parts);
        $parts = new Collection();
        foreach ($pids as $pid){
            $part = SparePart::find($pid);
            $parts->push($part);
        }
        
        //ATRIBUTOS
        $attrs = ProductAttr::where('product_id', $id)->get();

        $files = $product->getFilesData(1);
        $mainImage = '';
        $techImage = '';
        foreach ($files as $file){
            if ($file['image_type'] == 1) $mainImage = $file['img'];
            if ($file['image_type'] == 2) $techImage = $file['img'];
        }
        // dd($mainImage, $techImage);
        // $logo = public_path('pdf/logo_producto.png'); 
        $pdf = Pdf::loadView('pdfs.pdf1', [
            'product' => $product,
            // 'logo' => $logo,
            'parts' => $parts,
            'attrs' => $attrs,
            'mainImage' => $mainImage,
            'techImage' => $techImage
        ]);

        return $pdf->stream('pdf1.pdf');

        // return view('pdfs.pdf1', [
        //     'product' => $product,
        //     // 'logo' => $logo,
        //     'parts' => $parts,
        //     'attrs' => $attrs,
        //     'mainImage' => $mainImage,
        //     'techImage' => $techImage
        // ]);
    }

    public function pdf2($id)
    {
        $pdf = Pdf::loadView('pdfs.pdf2', [
        ]);

        return $pdf->stream('pdf2.pdf');

        return view('pdfs.pdf2', [
        ]);
    }
}
