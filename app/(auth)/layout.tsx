import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import GlassPane from '@/components/GlassPane'
import './../globals.css'

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-main">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  )
}
