<?php

// Auth
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
// Company
use App\Http\Controllers\Company\CompanyApplyController;
use App\Http\Controllers\Company\DashboardController as CompanyDashboardController;
// Course
use App\Http\Controllers\CourseRouteController;
// Profile
use App\Http\Controllers\Profile\ProfileController;
// Student
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
// Teacher
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\TeacherApplyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route Umum (Tanpa Login)
Route::inertia('/', 'Landing')->name('landing-page');

// Login & Auth Google
Route::get('/login', function () {
    return Inertia::render('Auth/LoginPage');
})->name('login');

Route::get('/Auth/LoginPage', [GoogleAuthController::class, 'index'])->name('Auth.LoginPage');
Route::get('/auth/google', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

Route::post('/login-admin', [AdminAuthController::class, 'login']);

// Group Route yang Membutuhkan Login
Route::middleware(['auth', 'verified'])->group(function () {

    // ---------------------------------------------------------
    // (Apply & Waiting) - Access before Approved
    // ---------------------------------------------------------

    // Company Apply & Waiting
    Route::get('/company/apply', [CompanyApplyController::class, 'create'])->name('company.apply');
    Route::post('/company/apply', [CompanyApplyController::class, 'store'])->name('company.store');
    Route::get('/company/waiting-approval', [CompanyApplyController::class, 'waiting'])->name('company.waiting');

    // Teacher Apply & Waiting
    Route::get('/teacher/apply', [TeacherApplyController::class, 'create'])->name('teacher.apply');
    Route::post('/teacher/apply', [TeacherApplyController::class, 'store'])->name('teacher.store');
    Route::get('/teacher/waiting-approval', [TeacherApplyController::class, 'waiting'])->name('teacher.waiting');

    // ---------------------------------------------------------
    // Main Page/Dashboard (Only Approved)
    // ---------------------------------------------------------

    // Student
    Route::middleware('role:student')->group(function () {
        Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');
    });

    // Teacher Dashboard
    Route::middleware('role:teacher')->group(function () {
        Route::get('/teacher/dashboard', [TeacherDashboardController::class, 'index'])->name('teacher.dashboard');
    });

    // Company Dashboard
    Route::middleware('role:company')->group(function () {
        Route::get('/company/dashboard', [CompanyDashboardController::class, 'index'])->name('company.dashboard');
    });

    // Admin
    Route::middleware('role:admin')->group(function () {
        Route::get('/courses/c/{courseRoute}', [CourseRouteController::class, 'show'])->name('dynamic.courses.route');
    });

    // Profile & Logout
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::post('/profile', [ProfileController::class, 'update']);

    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
});
