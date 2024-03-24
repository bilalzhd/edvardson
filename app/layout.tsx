import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css';
import { Roboto_Slab } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { AppProvider } from '../context';
import { Metadata } from 'next';

const inter = Roboto_Slab({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Edvardson Sweden - Jaktbutik Och Vildmarksbutik",
    template: "%s - Edvardson Sweden - Jaktbutik Och Vildmarksbutik"
  },
  description: 'Kunskap, kvalitet och gediget hantverk. Egentillverkade läderprodukter och jakttillbehör av högsta kvalitet av Edvardson Sweden AB i Malungsfors!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <head>
        <link rel="icon" href="/favicon-3c61b1.png" type="image/png" sizes="32x32" />
      </head>
      <AppProvider>
        <body className={inter.className}>
          <NextTopLoader color='#000' />
          <div className='min-h-screen overflow-x-hidden
          text-grayish'>
            <Header />
            <main className='transition-all duration-100'>{children}</main>
            <Footer />
          </div>
        </body>
      </AppProvider>
    </html>
  )
}