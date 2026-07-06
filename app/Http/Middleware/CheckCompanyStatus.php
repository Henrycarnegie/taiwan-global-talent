<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckCompanyStatus
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $company = $user->companyProfile;

        if (! $company) {
            if ($request->routeIs('company.register') || $request->routeIs('company.store')) {
                return $next($request);
            }

            return redirect()->route('company.register');
        }

        if ($company->status === 'pending') {
            if ($request->routeIs('company.waiting')) {
                return $next($request);
            }

            return redirect()->route('company.waiting');
        }

        if ($company->status === 'rejected') {
            if ($request->routeIs('company.register') || $request->routeIs('company.store')) {
                return $next($request);
            }

            return redirect()->route('company.register')->with('error', 'Registration rejected: '.$company->rejection_reason);
        }

        return $next($request);
    }
}
