import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from "@/providers/QueryProvider";
import SheetProvider from "@/providers/SheetProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FinTracker",
    description: "Track and Manage your accounts and transactions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <QueryProvider>
                        <SheetProvider />
                        <Toaster />
                        {children}
                    </QueryProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
