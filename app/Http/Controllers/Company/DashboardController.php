<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Cek apakah user punya role company
        if (!$user->hasRole('company')) {
            // Jika tidak punya, redirect atau return error sesuai keinginan
            abort(403, 'Anda bukan company');
        }
        
        // Ambil company yang terkait dengan user
        // Kita asumsikan ada relasi hasOne dari User ke Company        
        return Inertia::render('Company/Dashboard', [
            'company' => $user
        ]);
    }
}
