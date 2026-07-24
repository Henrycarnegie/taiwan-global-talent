<?php

// Auth
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
// Company
use App\Http\Controllers\Company\CompanyApplicantController;
use App\Http\Controllers\Company\CompanyApplyController;
use App\Http\Controllers\Company\CompanyCommunityController;
use App\Http\Controllers\Company\CompanyJobController;
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
use App\Http\Controllers\Student\StudentJobController;
// Teacher
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Controllers\Teacher\TeacherApplyController;
use App\Http\Controllers\Teacher\TeacherCourseController;
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

    // COMPANY ROLE
    Route::middleware(['role:company', 'check.company.status'])->group(function () {
        Route::prefix('company')->name('company.')->group(function () {
            Route::get('/dashboard', [CompanyDashboardController::class, 'index'])->name('dashboard');

            // Job Postings Routes
            Route::resource('jobs', CompanyJobController::class);

            // Applicants Routes
            Route::get('/applicants', [CompanyApplicantController::class, 'index'])->name('applicants.index');

            // Community Routes
            Route::get('/community', [CompanyCommunityController::class, 'index'])->name('community.index');
            Route::post('/community', [CompanyCommunityController::class, 'store'])->name('community.store');
            Route::post('/community/{id}/like', [CompanyCommunityController::class, 'toggleLike'])->name('community.like');
            Route::post('/community/{id}/comment', [CompanyCommunityController::class, 'storeComment'])->name('community.comment');
        });
    });

    // STUDENT ROLE
    Route::middleware('role:student')->group(function () {

        Route::prefix('student')->name('student.')->group(function () {
            Route::get('/dashboard', [StudentDashboardController::class, 'index'])
                ->name('dashboard');

            Route::prefix('courses')->name('courses.')->group(function () {

                // 1. Index & Enroll (Paling atas)
                Route::get('/', [CourseController::class, 'index'])
                    ->name('index');

                Route::post('/{module}/enroll', [EnrollmentController::class, 'enroll'])
                    ->name('enroll');

                Route::post('/{module}/lessons/{lesson}/complete', [LessonProgressController::class, 'completeLesson'])
                    ->name('lessons.complete');

                // 2. Sertifikat (Dipindah ke atas wildcard agar tidak tertangkap oleh {categorySlug})
                Route::get('/certificate', [DownloadCertificateController::class, 'index'])
                    ->name('certificate.index');

                Route::get('/{module}/certificate', [DownloadCertificateController::class, 'downloadCertificate'])
                    ->middleware('throttle:certificate-download')
                    ->name('certificate.download');

                // 3. Detail Kategori & Detail Kursus (Paling bawah)
                Route::get('/{categorySlug}', [CourseController::class, 'showByCategory'])
                    ->name('showCategory');

                Route::get('/{categorySlug}/{module}', [CourseController::class, 'show'])
                    ->name('show');
            });

            Route::get('/profile', [ProfilePageController::class, 'show'])
                ->name('profile.show');

            Route::prefix('community')->name('community.')->group(function () {
                Route::get('/', [CommunityPostController::class, 'index'])->name('index');
                Route::post('/posts', [CommunityPostController::class, 'store'])->name('posts.store');
                Route::post('/posts/{id}/like', [CommunityPostController::class, 'toggleLike'])->name('posts.like');
                Route::post('/posts/{postId}/comments', [CommunityPostController::class, 'storeComment'])->name('comments.store');
            });

            // Student Jobs Routes
            Route::prefix('jobs')->name('jobs.')->group(function () {
                Route::get('/', [StudentJobController::class, 'index'])->name('index');
                Route::get('/{job:slug}', [StudentJobController::class, 'show'])->name('show');
                Route::post('/{job}/apply', [StudentJobController::class, 'apply'])->name('apply');
            });
        });

        Route::patch('/profile/update', [ProfilePageController::class, 'update'])
            ->name('profile.update');
    });

    // TEACHER ROLE
    Route::middleware('role:teacher')->group(function () {
        Route::prefix('teacher')->name('teacher.')->group(function () {
        Route::get('/dashboard', [TeacherCourseController::class, 'index'])->name('dashboard');
        Route::get('/courses/create', [TeacherCourseController::class, 'create'])->name('courses.create');
        Route::post('/courses', [TeacherCourseController::class, 'store'])->name('courses.store');
        Route::get('/courses/{course}/edit', [TeacherCourseController::class, 'edit'])->name('courses.edit');  });
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