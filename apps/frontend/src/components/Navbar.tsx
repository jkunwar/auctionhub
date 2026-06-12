'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const links = [
  {
    name: 'Browse Auctions',
    href: '/listings'
  },
  {
    name: 'How it works',
    href: '/how-it-works'
  }
]

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) =>
    pathname === path ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-gray-900'

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-xl">Auction</span>
            <span className="font-bold text-xl text-gray-900">Hub</span>
            <span className="text-xs text-gray-500 mt-1">Nepal</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link key={link.href} href={link.href} className={`text-sm ${isActive(link.href)}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
