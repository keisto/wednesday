import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import GlassPane from '@/components/GlassPane'
import Sidebar from '@/components/Sidebar'
import '../globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-main">
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  )
}
