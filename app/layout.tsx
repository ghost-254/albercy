import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppChat from '@/components/WhatsAppChat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Albercy Auto Clinic',
  description: 'No. 1 Expert Auto Repair and Maintenance Services in Nairobi, Kenya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppChat />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      </body>
    </html>
  )
}

