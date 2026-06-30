<?php

namespace App\Http\Controllers;

use App\Models\CourseRoute;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseRouteController extends Controller
{
    public function show(CourseRoute $courseRoute)
    {
        if (!$courseRoute->is_active) {
            abort(404);
        }

        return view('courses.dynamic-index', [
            'courseRoute' => $courseRoute,
        ]);
    }
}
