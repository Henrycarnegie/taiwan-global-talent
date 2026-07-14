<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Cek apakah user punya role company
        if (! $user->hasRole('company')) {
            // Jika tidak punya, redirect atau return error sesuai keinginan
            abort(403, 'You are not a company user.');
        }

        // Ambil company yang terkait dengan user
        // Kita asumsikan ada relasi hasOne dari User ke Company
        return Inertia::render('Company/Dashboard', [
            'company' => $user,
        ]);
    }
}
