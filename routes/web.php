<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
 
Route::middleware('auth')->group(function () {

    ///Midleware para roles
    Route::middleware(['check-permission:1,2'])->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('Test2');
        });
    });

    Route::get('/', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    

    Route::get('/test', function () {
        return Inertia::render('Test');
    })->name('test');

    Route::get('/test2', [ProfileController::class, 'edit'])->name('test2');
    Route::get('/test3', [ProfileController::class, 'edit'])->name('test3');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
