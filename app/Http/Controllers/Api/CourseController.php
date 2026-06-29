<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        // Return only published courses for the public React app
        return Course::where('is_published', true)->get();
    }

    public function show(Course $course)
    {
        return $course;
    }
}
