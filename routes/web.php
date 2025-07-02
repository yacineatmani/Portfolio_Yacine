<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/cv/download', [PortfolioController::class, 'downloadCv'])->name('cv.download');

// --- Dashboard Routes ---
Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/new', [DashboardController::class, 'new'])->name('new'); // Nouveau dashboard

    // Project Routes
    Route::post('/projects', [DashboardController::class, 'storeProject'])->name('projects.store');
    Route::delete('/projects/{project}', [DashboardController::class, 'destroyProject'])->name('projects.destroy');

    // Skill Routes
    Route::post('/skills', [DashboardController::class, 'storeSkill'])->name('skills.store');
    Route::delete('/skills/{skill}', [DashboardController::class, 'destroySkill'])->name('skills.destroy');

    // CV Route
    Route::post('/cv', [DashboardController::class, 'uploadCv'])->name('cv.store');
});

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/auth.php';