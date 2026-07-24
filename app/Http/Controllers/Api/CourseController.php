<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of all published courses.
     */
    public function index()
    {
        return Module::where('is_published', true)->get();
    }

    /**
     * Display the specified course with its lessons and certification status.
     */
    public function show(Module $module, Request $request)
    {
        $user = $request->user();
        
        return [
            'module' => $module->load('lessons'),
            'is_certified' => $user ? $module->isCompletedByUser($user->id) : false,
        ];
    }   
}