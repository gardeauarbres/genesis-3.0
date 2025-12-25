import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Genesis Omega',
    description: 'Interface de Commandement Unifiée',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <head>
                {/* Preconnect for Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            </head>
            <body className="antialiased bg-black text-white h-screen w-screen overflow-hidden">
                {children}
            </body>
        </html>
    );
}
