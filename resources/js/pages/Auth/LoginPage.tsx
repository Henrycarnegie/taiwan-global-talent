import { useState } from 'react';

interface RoleOption {
    id: 'student' | 'teacher' | 'company' | 'admin';
    label: string;
    desc: string;
    icon: string;
}

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState<
        'student' | 'teacher' | 'company' | 'admin'
    >('student');

    // State for admin form input.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginWithGoogle = () => {
        window.location.href = `/auth/google?role=${selectedRole}`;
    };

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/login-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check whether the response is JSON.
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json();

                if (response.ok) {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                    }

                    window.location.href = '/admin';
                } else {
                    alert(data.message || 'Login failed.');
                }
            } else {
                // Handle an HTML error response from Laravel.
                const textError = await response.text();
                console.error('Laravel Error HTML:', textError);
                alert(
                    'An internal server error occurred (Error 500). Please check the Laravel logs.',
                );
            }
        } catch (error) {
            console.error('Failed to connect to the Laravel backend', error);
        }
    };

    const roles: RoleOption[] = [
        {
            id: 'student',
            label: 'Student',
            desc: 'Learn & find opportunities',
            icon: '🎓',
        },
        {
            id: 'teacher',
            label: 'Teacher',
            desc: 'Teach & manage classes',
            icon: '👨‍🏫',
        },
        {
            id: 'company',
            label: 'Company',
            desc: 'Recruit top talent',
            icon: '🏢',
        },
        {
            id: 'admin',
            label: 'Admin',
            desc: 'Manage the platform',
            icon: '🛡️',
        },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-sm">
                        TG
                    </div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                        Taiwan Global Talent
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Choose your role to continue
                    </p>
                </div>

                {/* Role Selector Grid */}
                <div className="mb-8 grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            type="button"
                            onClick={() => setSelectedRole(role.id)}
                            className={`flex cursor-pointer flex-col items-start rounded-xl border p-3.5 text-left transition-all duration-200 focus:outline-none ${
                                selectedRole === role.id
                                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <span className="mb-1 text-xl">{role.icon}</span>
                            <span
                                className={`text-sm font-bold ${
                                    selectedRole === role.id
                                        ? 'text-blue-700'
                                        : 'text-gray-900'
                                }`}
                            >
                                {role.label}
                            </span>
                            <span className="mt-0.5 text-[11px] leading-tight text-gray-500">
                                {role.desc}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Conditional rendering based on role. */}
                {selectedRole === 'admin' ? (
                    /* FORM LOGIN KHUSUS ADMIN */
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-bold tracking-wide text-gray-700 uppercase">
                                Email Admin
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@taiwanglobal.com"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-bold tracking-wide text-gray-700 uppercase">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-800"
                        >
                            Sign in as Admin
                        </button>
                    </form>
                ) : (
                    /* Google sign-in button for students, teachers, and companies. */
                    <div className="space-y-4">
                        <button
                            onClick={loginWithGoogle}
                            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-gray-100"
                        >
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>
                                Sign in as{' '}
                                {
                                    roles.find((r) => r.id === selectedRole)
                                        ?.label
                                }
                            </span>
                        </button>
                    </div>
                )}

                {/* Terms of service footer. */}
                <p className="mt-4 text-center text-xs text-gray-400">
                    By signing in, you agree to the Terms of Service & Privacy
                    Privasi kami.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
