<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! $request->user() || $request->user()->role?->name !== $role) {
            abort(403, 'Forbidden');
        }

        return $next($request);
    }
}
