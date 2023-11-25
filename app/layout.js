import { Actor } from 'next/font/google'
import './globals.css'

const actor = Actor({ subsets: ['latin'], weight:['400']})

export const metadata = {
  title: 'Calorie Guard',
  description: 'The Easiest way to count calorie',
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={actor.className}>{children}</body>
    </html>
  )
}
