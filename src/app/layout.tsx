
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import AuthProvider from "@/context/AuthProvider";
import BankProvider from "@/context/BankProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <BankProvider>
        <body className={cn('bg-background' , inter.className)}>
        
        <ThemeProvider attribute="class">
       
          {children}

      
          
      
        </ThemeProvider>
        <Toaster/>
        </body>
        </BankProvider>
     
      </AuthProvider>
     
    </html>
  );
}