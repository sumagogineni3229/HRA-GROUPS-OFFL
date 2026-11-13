
import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Playfair_Display,
  Manrope,
  DM_Sans,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingActions from "@/components/FloatingActions";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hragroups.com"),
  title:
    "HRA Groups | IT Consulting, Web Development & IT Training in Hyderabad",
  description:
    "HRA Groups offers enterprise IT consultancy, custom web development, and certified IT training programs in Hyderabad. Build scalable tech solutions today.",
  openGraph: {
    title:
      "HRA Groups | IT Consulting Services",
    description:
      "Enterprise IT consultancy, custom web and software development, AI solutions, and IT training programs.",
    url: "https://hragroups.com",
    siteName: "HRA Groups",
    type: "website",
    images: [
      {
        url: "/images/hra-logo.png",
        alt: "HRA Groups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HRA Groups | IT Solutions & Training",
    description:
      "Custom web development, IT consulting, AI solutions, and IT training in Hyderabad.",
    images: ["/images/hra-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@type": ["Organization", "ITService", "ProfessionalService"],
  "@id": "https://hragroups.com/#organization",
  name: "HRA Groups",
  alternateName: [
    "HRA Groups Hyderabad",
    "HRA Groups IT Solutions",
  ],
  url: "https://hragroups.com",
  logo: "https://hragroups.com/images/hra-logo.png",
  description:
    "Enterprise IT consultancy, custom web and software development, AI solutions, and certified IT training programs in Hyderabad.",
  telephone: "+919676272283",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385044,
    longitude: 78.486671,
  },
  sameAs: [
    "https://www.linkedin.com/company/hra-groups",
    "https://www.instagram.com/hragroups",
    "https://twitter.com/hragroups",
    "https://www.youtube.com/@hragroups",
  ],
  knowsAbout: [
    "Information Technology Consulting",
    "Web Development",
    "Custom Software Development",
    "Artificial Intelligence & Machine Learning",
    "Cloud Computing & DevOps",
    "IT Training & Internships",
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://hragroups.com/#website",
  url: "https://hragroups.com",
  name: "HRA Groups",
  publisher: {
    "@id": "https://hragroups.com/#organization",
  },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${dmSans.variable} ${plusJakarta.variable} ${inter.variable} ${playfair.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event:'gtm.js'
                });
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K9JTFV4V');
            `,
          }}
        />

        {/* Website structured data for SEO */}
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                organizationSchema,
                websiteSchema,
              ],
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col font-sans bg-[#070c18] text-slate-100 selection:bg-[#0052cc]/20 selection:text-[#003882] transition-colors duration-300">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9JTFV4V"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
            title="Google Tag Manager"
          />
        </noscript>

        <ThemeProvider>
          {children}
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
