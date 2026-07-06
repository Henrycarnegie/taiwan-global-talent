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
use App\Http\Controllers\Student\CommunityController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\MandarinCourseController; // Pastikan Anda membuat Controller ini
// Teacher
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\TeacherApplyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Landing')->name('landing-page');

Route::get('/login', function () {
    return Inertia::render('Auth/LoginPage');
})->name('login');

Route::get('/auth/google', [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::post('/login-admin', [AdminAuthController::class, 'login']);

Route::middleware(['auth', 'verified'])->group(function () {

    // Company Apply & Waiting
    Route::prefix('company/apply')->name('company.')->group(function () {
        Route::get('/', [CompanyApplyController::class, 'create'])->name('register');
        Route::post('/store', [CompanyApplyController::class, 'store'])->name('store');
        Route::get('/waiting', [CompanyApplyController::class, 'waiting'])->name('waiting');
    });

    // Teacher Apply & Waiting
    Route::prefix('teacher/apply')->name('teacher.')->group(function () {
        Route::get('/', [TeacherApplyController::class, 'create'])->name('apply');
        Route::post('/store', [TeacherApplyController::class, 'store'])->name('store');
        Route::get('/waiting-approval', [TeacherApplyController::class, 'waiting'])->name('waiting');
    });

    // STUDENT ROLE
    Route::middleware('role:student')->group(function () {
        Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])->name('student.dashboard');

        // Rute Fitur Komunitas Siswa (Sesuai Struktur Folder Baru)
        Route::get('/student/community', [CommunityController::class, 'index'])->name('student.community');

        // Rute Kursus Mandarin Halaman Terpisah
        Route::get('/mandarin-courses', [MandarinCourseController::class, 'index'])->name('mandarin-courses.index');
        Route::get('/mandarin-courses/{course}', [MandarinCourseController::class, 'show'])->name('mandarin-courses.show');
    });

    // TEACHER ROLE
    Route::middleware('role:teacher')->group(function () {
        Route::get('/teacher/dashboard', [TeacherDashboardController::class, 'index'])->name('teacher.dashboard');
    });

    // COMPANY ROLE
    Route::middleware(['role:company', 'check.company.status'])->prefix('company')->name('company.')->group(function () {
        Route::get('/dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');
    });

    // ADMIN ROLE
    Route::middleware('role:admin')->group(function () {
        Route::get('/courses/c/{courseRoute}', [CourseRouteController::class, 'show'])->name('dynamic.courses.route');
    });

    // ---------------------------------------------------------
    // Global Authenticated Routes (Profile & Logout)
    // ---------------------------------------------------------
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
});
