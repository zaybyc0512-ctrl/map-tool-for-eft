import type { Metadata } from 'next';
import './globals.css';

import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import StoreHydration from '@/components/shared/StoreHydration';
import SocialLinks from '@/components/layout/SocialLinks';

export const metadata: Metadata = {
    title: 'Map Tool for EFT',
    description: 'Interactive maps and wiki for Escape from Tarkov',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-sans min-h-screen flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }} suppressHydrationWarning>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2766779652554742"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <StoreHydration />
                <SocialLinks />
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
