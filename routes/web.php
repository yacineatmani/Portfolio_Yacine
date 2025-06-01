<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/projects', [DashboardController::class, 'storeProject'])->name('projects.store');
    Route::post('/skills', [DashboardController::class, 'storeSkill'])->name('skills.store');
});

Route::delete('/projects/{project}', [DashboardController::class, 'destroyProject'])->name('projects.destroy');

Route::post('/cv/cv.pdf', [ProfileController::class, 'uploadCv'])->middleware('auth');
require __DIR__.'/auth.php';

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');