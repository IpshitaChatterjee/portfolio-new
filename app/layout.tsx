import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ipshita Chatterjee — Product Design Engineer",
  description:
    "Product designer with 7 years of experience, currently working at JP Morgan Chase. Available for full-time roles in Germany.",
  openGraph: {
    title: "Ipshita Chatterjee — Product Design Engineer",
    description: "Product designer with 7 years of experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Anti-FOUC: apply saved theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
