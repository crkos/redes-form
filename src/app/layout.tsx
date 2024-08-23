import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const QueryProviderLayout = dynamic(() => import('@/providers/QueryProvider'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "Form Application - Jordan Higuera",
  description: "Aplicacion para la materia de Redes - Seguridad",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryProviderLayout>
        {children}
        <Toaster />
      </QueryProviderLayout>
      </body>
    </html>
  );
}
