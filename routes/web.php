<?php

// Auth
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
// Company
use App\Http\Controllers\Company\CompanyApplyController;
use App\Http\Controllers\Company\DashboardController as CompanyDashboardController;
// Profile
use App\Http\Controllers\Profile\ProfilePageController;
// Student
use App\Http\Controllers\Student\CommunityPostController;
use App\Http\Controllers\Student\CourseController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\DownloadCertificateController;
use App\Http\Controllers\Student\EnrollmentController;
use App\Http\Controllers\Student\LessonProgressController;
// Teacher
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\TeacherApplyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Landing')->name('home');

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
        Route::get('/student/profile', [ProfilePageController::class, 'show'])->name('profile.show');
        Route::patch('/profile/update', [ProfilePageController::class, 'update'])->name('profile.update');

        // 1. Rute POST
        Route::post('/student/courses/{course}/enroll', [EnrollmentController::class, 'enroll'])->name('student.courses.enroll');
        Route::post('/student/courses/{course}/lessons/{lesson}/complete', [LessonProgressController::class, 'completeLesson'])->name('student.lessons.complete');

        // 2. RUTE SPESIFIK (DOWNLOAD) HARUS DI ATAS WILDCARD
        Route::get('/student/courses/certificate', [DownloadCertificateController::class, 'index'])
            ->name('student.courses.certificate.index');

        // Endpoint khusus untuk memicu download file fisik PDF dari S3/R2
        Route::get('/student/courses/{course}/certificate', [DownloadCertificateController::class, 'downloadCertificate'])
            ->middleware('throttle:certificate-download')
            ->name('student.courses.certificate.download');

        // 3. RUTE WILDCARD SLUG DI PALING BAWAH
        Route::get('/student/courses/{categorySlug}', [CourseController::class, 'index'])->name('student.courses.index');
        Route::get('/student/courses/{categorySlug}/{course}', [CourseController::class, 'show'])->name('student.courses.show');

        // 4. Community
        Route::get('student/community', [CommunityPostController::class, 'index'])->name('community.index');

        // Kirim Postingan Baru
        Route::post('student/community/posts', [CommunityPostController::class, 'store'])->name('community.posts.store');

        // Toggle Like Postingan
        Route::post('student/community/posts/{id}/like', [CommunityPostController::class, 'toggleLike'])->name('community.posts.like');
        Route::post('/community/posts/{postId}/comments', [CommunityPostController::class, 'storeComment'])->name('community.comments.store');
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
    Route::middleware('role:admin')->group(function () {});

    // ---------------------------------------------------------
    // Global Authenticated Routes (Profile & Logout)
    // ---------------------------------------------------------
    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
});
