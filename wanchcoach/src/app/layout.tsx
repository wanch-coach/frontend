import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "완치코치",
  description: "진료와 처방전 관리를 한번에",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
