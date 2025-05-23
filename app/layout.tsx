import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TicketProvider } from "./_components/TicketContext";

const Roboto_Font = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Ticketmaster",
  description: "A ticket management system",
  icons: {
    icon: "/icon-v2.png",
  },
};

export default function RootLayout({ children}:
Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${Roboto_Font.className}`}>
        <TicketProvider>{children}</TicketProvider>
      </body>
    </html>
  );
}
