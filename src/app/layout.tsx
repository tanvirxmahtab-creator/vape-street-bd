import type { Metadata } from 'next';
import '@/src/index.css';

export const metadata: Metadata = {
  title: 'Vape Street BD | Premier Vape Shop in Mirpur & Dhaka | Best Vape Prices in BD',
  description: "Vape Street BD is Bangladesh's premier luxury vape shop located in Mirpur, Dhaka. Shop authentic vape devices, e-liquids, salt nic, coils & accessories at best vape prices in Dhaka.",
  keywords: [
    'Vape Street BD',
    'vape shop in mirpur',
    'vape dhaka',
    'vape price in dhaka',
    'vape shop in bangladesh',
    'mirpur vape store',
    'authentic e-liquids dhaka',
    'salt nic price bd',
    'caliburn g3 price bangladesh'
  ],
  authors: [{ name: 'Vape Street BD' }],
  metadataBase: new URL('https://vapestreetbd.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vapestreetbd.com',
    title: 'Vape Street BD | Premier Vape Shop in Mirpur & Dhaka',
    description: "Bangladesh's premier luxury vape shop located in Mirpur, Dhaka. Authentic vape devices, e-liquids, and salt nic at best prices.",
    siteName: 'Vape Street BD',
    images: [
      {
        url: '/shop-logo.png',
        width: 1200,
        height: 630,
        alt: 'Vape Street BD Premier Vape Shop Mirpur Dhaka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vape Street BD | Premier Vape Shop in Mirpur & Dhaka',
    description: 'Authentic vape devices, premium e-liquids, and salt nic at best vape prices in Dhaka, Bangladesh.',
    images: ['/shop-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Vape Street BD',
  image: 'https://vapestreetbd.com/shop-logo.png',
  description: "Bangladesh's premier luxury vape shop located in Mirpur, Dhaka offering authentic vape devices, e-liquids, and salt nic at best prices in Bangladesh.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mirpur',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka Division',
    postalCode: '1216',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.8069,
    longitude: 90.3687,
  },
  url: 'https://vapestreetbd.com',
  telephone: '+8801700000000',
  priceRange: '৳৳',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:00',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-[#E1E0CC] font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
