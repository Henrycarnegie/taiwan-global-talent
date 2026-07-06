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

        // Check whether the user has the company role.
        if (! $user->hasRole('company')) {
            // Redirect or return an error if no company is available.
            abort(403, 'You do not have a company account.');
        }

        // Retrieve the company associated with the user.
        // The user is expected to have a has-one company relationship.
        return Inertia::render('Company/Dashboard', [
            'company' => $user,
        ]);
    }
}
