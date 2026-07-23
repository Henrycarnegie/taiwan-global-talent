import { Link } from '@inertiajs/react';
import { Bell, UserCheck, Briefcase, Building2, Check } from 'lucide-react';
import { useState } from 'react';

export interface NotificationItem {
    id: string | number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'applicant' | 'system' | 'job';
    link?: string;
}

interface NotificationDropdownProps {
    isOpen: boolean;
    onToggle: () => void;
    initialNotifications?: NotificationItem[];
}

export default function NotificationDropdown({
    isOpen,
    onToggle,
    initialNotifications = [],
}: NotificationDropdownProps) {
    const [notifications, setNotifications] = useState<NotificationItem[]>(
        initialNotifications.length > 0
            ? initialNotifications
            : [
                  {
                      id: 1,
                      title: 'Pelamar Baru!',
                      message: 'Kevin Tan baru saja melamar ke posisi Senior React Developer.',
                      time: '10 menit yang lalu',
                      read: false,
                      type: 'applicant',
                      link: '/company/applicants',
                  },
                  {
                      id: 2,
                      title: 'Status Verifikasi',
                      message: 'Profil perusahaan kamu telah disetujui oleh Admin.',
                      time: '2 jam yang lalu',
                      read: false,
                      type: 'system',
                      link: '/company/dashboard',
                  },
                  {
                      id: 3,
                      title: 'Lowongan Tayang',
                      message: 'Lowongan "Frontend Engineer" berhasil terpublikasi.',
                      time: '1 hari yang lalu',
                      read: true,
                      type: 'job',
                      link: '/company/jobs',
                  },
              ]
    );

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const markAsRead = (id: string | number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'applicant':
                return <UserCheck className="h-4 w-4 text-blue-600" />;
            case 'job':
                return <Briefcase className="h-4 w-4 text-emerald-600" />;
            default:
                return <Building2 className="h-4 w-4 text-indigo-600" />;
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="relative rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                                Notifikasi
                            </h3>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                                    {unreadCount} Baru
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                                <Check className="h-3 w-3" /> Tandai Semua Dibaca
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <Link
                                    key={notif.id}
                                    href={notif.link || '#'}
                                    onClick={() => {
                                        markAsRead(notif.id);
                                        onToggle();
                                    }}
                                    className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                                        !notif.read ? 'bg-slate-50/70 dark:bg-slate-800/30' : ''
                                    }`}
                                >
                                    <div className="mt-0.5 rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                                        {getNotifIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                                            {notif.title}
                                        </p>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                                            {notif.message}
                                        </p>
                                        <span className="mt-1 block text-[10px] text-slate-400">
                                            {notif.time}
                                        </span>
                                    </div>
                                    {!notif.read && (
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                                    )}
                                </Link>
                            ))
                        ) : (
                            <div className="p-6 text-center text-xs text-slate-500">
                                Tidak ada notifikasi saat ini.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}