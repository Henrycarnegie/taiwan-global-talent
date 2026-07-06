import { router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EditProfileModal from './EditProfileModal';

export default function ProfileDropdown() {
    const { user } = useAuth();

    const roleMapping: Record<number, string> = {
        1: 'Admin',
        2: 'Teacher',
        3: 'Student',
    };

    const role = roleMapping[user.role as unknown as number] || 'Student';

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger: avatar and name. */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 rounded-full p-1 text-left transition duration-200 outline-none hover:bg-gray-100 md:rounded-xl md:py-1.5 md:pr-3 md:pl-2"
            >
                {/* Avatar wrapper with an active indicator ring. */}
                <div
                    className={`relative shrink-0 rounded-full p-0.5 transition duration-200 ${isOpen ? 'ring-2 ring-blue-500 ring-offset-1' : 'group-hover:ring-2 group-hover:ring-gray-300'}`}
                >
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-9 w-9 rounded-full bg-gray-100 object-cover shadow-sm"
                        />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Information shown on desktop only. */}
                <div className="hidden max-w-30 text-left md:block">
                    <p className="truncate text-xs leading-none font-semibold text-gray-800">
                        {user.name}
                    </p>
                    <span className="mt-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                        {role}
                    </span>
                </div>
            </button>

            {/* POPUP / DROPDOWN MENU */}
            {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5 duration-200">
                    {/* User Mini Info Header */}
                    <div className="mb-1 flex items-center gap-3 border-b border-gray-50 px-2.5 py-3">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt=""
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm leading-tight font-bold text-gray-900">
                                {user.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-gray-400">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Menu Items Group */}
                    <div className="space-y-0.5">
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-gray-600 transition duration-150 hover:bg-slate-50 hover:text-gray-900"
                        >
                            <Settings className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                                Account Settings
                            </span>
                        </button>
                    </div>

                    {/* Separator */}
                    <div className="my-1 border-t border-gray-100"></div>

                    {/* Logout Group */}
                    <div>
                        <button
                            onClick={() => router.post('/logout')}
                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-red-600 transition duration-150 hover:bg-red-50/70"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Profile data management modal. */}
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
