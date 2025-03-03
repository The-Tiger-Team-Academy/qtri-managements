import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from './components/LayoutWrapper';

const inter = Inter({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'QUANTUM TECHNOLOGY RESEARCH INITIATIVE',
    description: 'QUANTUM TECHNOLOGY RESEARCH INITIATIVE Platform',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LayoutWrapper>
                    {children}
                </LayoutWrapper>
            </body>
        </html>
    );
}
