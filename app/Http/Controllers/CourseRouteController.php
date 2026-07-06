<?php

namespace App\Http\Controllers;

use App\Models\CourseRoute;
use Inertia\Inertia;
use Inertia\Response;

class CourseRouteController extends Controller
{
    public function show(CourseRoute $courseRoute): Response
    {
        if (! $courseRoute->is_active) {
            abort(404);
        }

        return Inertia::render('Student/MandarinCourse/Index', [
            'courseRoute' => $courseRoute,
        ]);
    }
}
