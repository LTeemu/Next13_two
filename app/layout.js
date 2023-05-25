import './globals.css'
import { Caveat, Exo_2 } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const caveat = Caveat({ subsets: ['latin'], weight: 'variable', variable: '--font-caveat' })
const exo2 = Exo_2({ subsets: ['latin'], weight: 'variable', variable: '--font-exo2' })

export const metadata = {
  title: 'Next13 Second',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`min-h-full flex ${caveat.variable} ${exo2.variable} font-exo2 overflow-x-hidden`}>
        <Header />
        <main className='flex-1'>{children}</main>
      </body>
    </html>
  )
}