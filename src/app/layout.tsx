'use client'  ;


import localFont from "next/font/local";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react"; 

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@chakra-ui/theme';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState( () => new QueryClient() )  ;
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>


        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
          {children}
          </ChakraProvider>
        </QueryClientProvider>
        
      </body>
    </html>
  );
}