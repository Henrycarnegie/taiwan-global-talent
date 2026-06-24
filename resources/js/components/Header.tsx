import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function Header({ profile }: any) {
  const [open, setOpen] = useState(false)

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 relative">

      <h2 className="font-semibold">Dashboard</h2>

      {/* AVATAR */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
        >
          <img
            src={profile?.avatar || 'https://i.pravatar.cc/40'}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{profile?.name}</span>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              View / Edit Profile
            </Link>

            <Link
              href="/settings"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Settings
            </Link>

            <hr />

            <Link
              method="post"
              href="/logout"
              as="button"
              className="block w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-500"
            >
              Logout
            </Link>
          </div>
        )}
      </div>

      {/* overlay click outside */}
      {open && (
        <div
          className="fixed inset-0"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  )
}