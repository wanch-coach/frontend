import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "../../public/fonts/style.css";
import Script from "next/script";

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

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html className={myFont.className}>
      <head>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
