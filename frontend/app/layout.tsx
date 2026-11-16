import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = { title: "VMLift", description: "VMware to AWS migration operations" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('vmlift-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} /></head><body className="font-sans antialiased"><AppShell>{children}</AppShell></body></html>;
}
