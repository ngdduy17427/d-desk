import 'css/global.css'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  icons: '/images/thumb/my-thumb.png',
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  authors: [
    { url: process.env.NEXT_PUBLIC_BASE_URL, name: process.env.NEXT_PUBLIC_APP_AUTHORS_CREATOR },
  ],
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS,
  creator: process.env.NEXT_PUBLIC_APP_AUTHORS_CREATOR,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: process.env.NEXT_PUBLIC_APP_TITLE,
    locale: process.env.NEXT_PUBLIC_APP_LOCALE,
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/images/thumb/d-desk-thumb.png`,
    emails: process.env.NEXT_PUBLIC_APP_EMAIL,
    type: 'website',
  },
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang='en'>
    <body>
      <main>{children}</main>
    </body>
  </html>
)

// eslint-disable-next-line import/no-default-export
export default RootLayout
