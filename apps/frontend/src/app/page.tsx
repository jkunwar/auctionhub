import Link from 'next/link'
import {api} from '@/lib/api'

async function getApiStatus() {
  try {
    const data = await api.get<{status: string; database: string}>('health')

    return data
  } catch (error) {
    return null
  }
}

export default async function HomePage() {
  const apiStatus = await getApiStatus()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Nepal&apos;s Online Auction Marketplace
        </h1>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
          Bid on verified items. With the auction. Pick up and pay at our store. Fair prices,
          transparent bidding.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/listings" className="btn-primary text-base px-6 py-3">
            Browse Auctions
          </Link>
          <Link href="/how-it-works" className="btn-secondary text-base px-6 py-3">
            How it works
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            step: '01',
            title: 'Browse & Bid',
            description:
              'Browse verified items and place your bid. Our proxy bidding system bids automatically up to your maximum.'
          },
          {
            step: '02',
            title: 'Win the Auction',
            description:
              "If you're the highest bidder when the auction closes, you win. We'll notify you immediately."
          },
          {
            step: '03',
            title: 'Pick Up & Pay',
            description:
              'Schedule a pickup time at our store. Pay in cash when you collect your item. Simple and safe.'
          }
        ].map(({step, title, description}) => (
          <div key={step} className="card">
            <div className="text-4xl font-bold text-red-100 mb-3">{step}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* System status — only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="card border-dashed border-gray-300 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-2">System status (dev only)</h3>
          {apiStatus ? (
            <div className="flex gap-6 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                API: {apiStatus.status}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Database: {apiStatus.database}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-red-600">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Backend not reachable — is Fastify running?
            </div>
          )}
        </div>
      )}
    </div>
  )
}
