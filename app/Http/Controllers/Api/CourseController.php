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
        // Return only published courses for the public React app
        return Course::where('is_published', true)->get();
    }

    /**
     * Display the specified course with its lessons.
     */
    public function show(Course $course)
    {
        // We use 'load' here to include the lessons relationship in the response
        return $course->load('lessons');
    }
}
