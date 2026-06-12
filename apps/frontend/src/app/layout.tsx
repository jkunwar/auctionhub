import type {Metadata} from 'next'
import './globals.css'

import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: {
    template: '%s | AuctionHub Nepal',
    default: 'AuctionHub Nepal - Online Auctions'
  },
  description:
    'Bid on verified items at AcutionHub Nepal. Timed auctions, fair prices, in-store pickup.',
  keywords: ['auction', 'Nepal', 'online-auction', 'buy', 'sell', 'bid']
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AuctionHub Nepal. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
