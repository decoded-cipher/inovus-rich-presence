import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inovus Rich Presence',
  description: 'A rich presence application by Inovus Labs',
  generator: 'Inovus Labs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
