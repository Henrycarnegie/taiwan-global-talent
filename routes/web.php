<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Route Umum (Tanpa Login)
Route::inertia('/', 'Landing')->name('landing-page');

// Login
Route::get('/login', function () {
    return Inertia::render('Auth/LoginPage');
})->name('login');

Route::get('/Auth/LoginPage', [GoogleAuthController::class, 'index'])->name('Auth.LoginPage');
Route::get('/auth/google', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

Route::post('/login-admin', [AdminAuthController::class, 'login']);

// BUNGKUS SEMUA ROUTE YANG BUTUH LOGIN DI SINI
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboards
    Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
    Route::get('/teacher/dashboard', [TeacherDashboardController::class, 'index'])->name('teacher.dashboard');
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Profile
    Route::patch('/account-settings', [AccountSettingsController::class, 'update'])->name('account.update');
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::post('/profile', [ProfileController::class, 'update']);

    // Logout
    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
});
