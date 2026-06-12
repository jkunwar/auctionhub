import type { Config } from 'tailwindcss'

const config: Config = {
  // Tell Tailwind which files to scan for class names
  // It only includes CSS for classes it actually finds — keeps bundle size small
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // Custom colours for AuctionHub
      colors: {
        brand: {
          50: '#fef3f2',
          100: '#fee4e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
