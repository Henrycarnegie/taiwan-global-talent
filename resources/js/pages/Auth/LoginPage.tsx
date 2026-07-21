import {
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    GraduationCap,
    ShieldCheck,
    UserCog,
} from 'lucide-react';
import { useState } from 'react';

interface RoleOption {
    id: 'student' | 'teacher' | 'company' | 'admin';
    label: string;
    desc: string;
    icon: typeof GraduationCap;
    goal: string;
}

const roles: RoleOption[] = [
    {
        id: 'student',
        label: 'Talent',
        desc: 'Learn Mandarin, build a profile, and discover opportunities.',
        icon: GraduationCap,
        goal: 'Study, career, and relocation pathways',
    },
    {
        id: 'teacher',
        label: 'Teacher',
        desc: 'Support learners with courses, mentoring, and skill building.',
        icon: BriefcaseBusiness,
        goal: 'Course delivery and learner progress',
    },
    {
        id: 'company',
        label: 'Company',
        desc: 'Find prepared international talent for Taiwan-based roles.',
        icon: Building2,
        goal: 'Recruitment and verified talent matching',
    },
    {
        id: 'admin',
        label: 'Admin',
        desc: 'Manage platform operations, approvals, and content.',
        icon: UserCog,
        goal: 'Secure platform administration',
    },
];

const trustItems = [
    'Goal-based recommendations',
    'Secure profile data handling',
    'Short registration with Google sign-in',
];

const LoginPage = () => {
    const [selectedRole, setSelectedRole] =
        useState<RoleOption['id']>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const selectedRoleDetails =
        roles.find((role) => role.id === selectedRole) ?? roles[0];

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
                const textError = await response.text();
                console.error('Laravel Error HTML:', textError);
                alert(
                    'An internal server error occurred. Please check the Laravel logs.',
                );
            }
        } catch (error) {
            console.error('Failed to connect to the Laravel backend', error);
        }
    };

    return (
        <main className="min-h-screen bg-[#f7f3ea] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-md bg-white shadow-[0_28px_90px_rgba(23,59,143,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
                <section className="relative hidden overflow-hidden bg-[#102a43] p-10 text-white lg:block">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82"
                        alt="People planning career and learning goals"
                        className="absolute inset-0 h-full w-full object-cover opacity-[0.72] saturate-110"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,42,67,0.76)_0%,rgba(16,42,67,0.28)_100%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                        <div>
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
                                <img
                                    src="/images/logo.png"
                                    alt="Taiwan Global Talent hub"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <h1 className="mt-8 max-w-lg text-5xl leading-tight font-black tracking-tight">
                                One platform for learning, opportunity, and
                                career mobility.
                            </h1>
                            <p className="mt-5 max-w-md text-base leading-8 font-semibold text-white/72">
                                Designed for different goals and life stages,
                                from first-time applicants to working
                                professionals preparing for Taiwan.
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {trustItems.map((item) => (
                                <div
                                    key={item}
                                    className="group flex items-center gap-3 rounded-md border border-white/16 bg-white/14 px-4 py-3 text-sm font-bold text-white/88 shadow-[0_10px_28px_rgba(15,23,42,0.16)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#28a6a1]/70 hover:bg-white/22 hover:text-white hover:shadow-[0_18px_42px_rgba(40,166,161,0.24)]"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-[#28a6a1] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flex items-center p-6 sm:p-10">
                    <div className="mx-auto w-full max-w-xl">
                        <div className="mb-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-[#173b8f]/10">
                                <img
                                    src="/images/logo.png"
                                    alt="Taiwan Global Talent hub"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#173b8f] sm:text-4xl">
                                Continue with the role that fits your goal.
                            </h2>
                            <p className="mt-3 text-sm leading-7 font-semibold text-slate-600">
                                Choose your role first so the platform can show
                                relevant pathways, dashboards, and next steps.
                            </p>
                        </div>

                        <fieldset>
                            <legend className="sr-only">
                                Select account role
                            </legend>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setSelectedRole(role.id)}
                                        aria-pressed={selectedRole === role.id}
                                        className={`min-h-32 rounded-md border p-4 text-left transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
                                            selectedRole === role.id
                                                ? 'border-[#173b8f] bg-[#173b8f] text-white shadow-[0_16px_40px_rgba(23,59,143,0.18)]'
                                                : 'border-slate-200 bg-white text-slate-800 hover:border-[#173b8f]/30 hover:bg-slate-50'
                                        }`}
                                    >
                                        <role.icon
                                            className={`h-6 w-6 ${
                                                selectedRole === role.id
                                                    ? 'text-[#f47b20]'
                                                    : 'text-[#173b8f]'
                                            }`}
                                        />
                                        <span className="mt-3 block text-base font-black">
                                            {role.label}
                                        </span>
                                        <span
                                            className={`mt-1 block text-xs leading-5 font-semibold ${
                                                selectedRole === role.id
                                                    ? 'text-white/72'
                                                    : 'text-slate-500'
                                            }`}
                                        >
                                            {role.desc}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className="mt-6 rounded-md border border-slate-200 bg-[#f7f3ea] p-4">
                            <p className="text-xs font-black tracking-widest text-[#f47b20] uppercase">
                                Personalized goal
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#173b8f]">
                                {selectedRoleDetails.goal}
                            </p>
                        </div>

                        {selectedRole === 'admin' ? (
                            <form
                                onSubmit={handleAdminLogin}
                                className="mt-6 space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="admin-email"
                                        className="mb-1 block text-xs font-black tracking-wide text-slate-700 uppercase"
                                    >
                                        Admin email
                                    </label>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="admin@taiwanglobal.com"
                                        className="min-h-12 w-full rounded-md border border-slate-300 px-4 text-sm focus:border-[#173b8f] focus:ring-2 focus:ring-[#173b8f]/20 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="admin-password"
                                        className="mb-1 block text-xs font-black tracking-wide text-slate-700 uppercase"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="admin-password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="min-h-12 w-full rounded-md border border-slate-300 px-4 text-sm focus:border-[#173b8f] focus:ring-2 focus:ring-[#173b8f]/20 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="min-h-12 w-full rounded-md bg-[#173b8f] px-5 text-sm font-black text-white transition hover:bg-[#102a43] focus:ring-2 focus:ring-[#f47b20] focus:ring-offset-2 focus:outline-none"
                                >
                                    Sign in as Admin
                                </button>
                            </form>
                        ) : (
                            <div className="mt-6 space-y-4">
                                <button
                                    type="button"
                                    onClick={loginWithGoogle}
                                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-slate-300 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-[#173b8f]/40 hover:bg-slate-50 focus:ring-2 focus:ring-[#f47b20] focus:ring-offset-2 focus:outline-none"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
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
                                    Continue with Google as{' '}
                                    {selectedRoleDetails.label}
                                </button>
                            </div>
                        )}

                        <div className="mt-6 flex items-start gap-3 rounded-md bg-slate-50 p-4 text-xs leading-6 text-slate-600">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#28a6a1]" />
                            <p>
                                We use your role and profile information to
                                personalize pathways, job matching, events, and
                                account services. You can update your profile
                                after signing in.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;
