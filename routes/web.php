<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FacultyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin/logs', function () {
    return Inertia::render('Admin/Logs');
})->name('admin.logs');

// Faculty management routes
Route::middleware(['auth'])->group(function () {
    Route::resource('faculties', FacultyController::class);
    Route::post('faculties/bulk-delete', [FacultyController::class, 'bulkDelete'])->name('faculties.bulk-delete');
    Route::patch('faculties/{faculty}/toggle-status', [FacultyController::class, 'toggleStatus'])->name('faculties.toggle-status');
});

// API routes for faculty
Route::get('api/faculties/department/{department}', [FacultyController::class, 'getByDepartment']);

require __DIR__.'/auth.php';
