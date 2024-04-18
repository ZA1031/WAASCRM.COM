<?php
use App\Helpers\Lerph;
use App\Http\Controllers\Tenant\CatalogController;
use App\Http\Controllers\Tenant\CompanyController;
use App\Http\Controllers\Tenant\MaterialController;
use App\Http\Controllers\Tenant\ProductController;
use App\Http\Controllers\Tenant\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('check-permission:0,1,2,3,4,5,6')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    ///Companies
    Route::resource('/company', CompanyController::class, ['names' => ['index' => 'company']]);

    ///Catalogs
    Route::get('/catalogs/{type}', [CatalogController::class, 'index'])->name('catalogs.index');
    Route::post('/catalogs/{type}/list', [CatalogController::class, 'list'])->name('catalogs.list');
    Route::post('/catalogs/{type}/store', [CatalogController::class, 'store'])->name('catalogs.store');
    Route::delete('/catalogs/{adminCatalog}', [CatalogController::class, 'destroy'])->name('catalogs.destroy');
    Route::get('/catalogs/{type}/{id}', [CatalogController::class, 'get'])->name('catalogs.get');

    ///Users
    Route::resource('/users', UserController::class, ['names' => ['index' => 'users']]);
    Route::post('/users/list', [UserController::class, 'list'])->name('users.list');

    ///Materials
    Route::resource('/materials', MaterialController::class, ['names' => ['index' => 'materials']]);
    Route::post('/materials/list', [MaterialController::class, 'list'])->name('materials.list');
    Route::post('/materials/changeStatus/{cid}', [MaterialController::class, 'changeStatus'])->name('materials.change.status');

    ///Products
    Route::resource('/prs', ProductController::class, ['names' => ['index' => 'prs']]);
    Route::post('/prs/list', [ProductController::class, 'list'])->name('prs.list');

});