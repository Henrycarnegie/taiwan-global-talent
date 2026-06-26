<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! $request->user()) {
            return redirect('/login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        if ($request->user()->role?->slug !== $role) {
            return redirect($request->user()->getDashboardUrl())->with('error', 'Anda tidak memiliki akses ke halaman tersebut.');
        }

        return $next($request);
    }
}
