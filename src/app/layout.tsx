import type { Metadata } from 'next';
import './globals.css';

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
            <body className="font-sans" style={{ fontFamily: 'Roboto, sans-serif' }} suppressHydrationWarning>{children}</body>
        </html>
    );
}
