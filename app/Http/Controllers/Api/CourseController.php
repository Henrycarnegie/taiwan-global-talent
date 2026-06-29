<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of all published courses.
     */
    public function index()
    {
        return Course::where('is_published', true)->get();
    }

    /**
     * Display the specified course with its lessons and certification status.
     */
    public function show(Course $course, Request $request)
    {
        $user = $request->user();
        
        return [
            'course' => $course->load('lessons'),
            'is_certified' => $user ? $course->isCompletedByUser($user->id) : false,
        ];
    }   
}