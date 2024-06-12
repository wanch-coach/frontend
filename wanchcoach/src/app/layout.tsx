import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "../../public/fonts/style.css";

export const metadata: Metadata = {
  title: "완치코치",
  description: "진료와 처방전 관리를 한번에",
  icons: {
    icon: "/logo.png",
  },
};

const myFont = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}
