import './globals.css'

export const metadata = {
  title: 'CaseGuard Pitch Dashboard',
  description: 'Marketing dashboard for CaseGuard growth strategy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

