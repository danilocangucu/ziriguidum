import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/shared/Footer";

export const charter = localFont({
  src: [
    {
      path: "/fonts/charter_regular.woff2",
      weight: "400",
      style: "normal",   // regular
    },
    {
      path: "/fonts/charter_italic.woff2",
      weight: "400",
      style: "italic",   // regular italic
    },
    {
      path: "/fonts/charter_bold.woff2",
      weight: "700",
      style: "normal",   // bold
    },
    {
      path: "/fonts/charter_bold_italic.woff2",
      weight: "700",
      style: "italic",   // bold italic
    },
  ],
  variable: "--font-charter",
});

const leMurmure = localFont({
  src: "/fonts/lemurmure-regular.woff2",
  weight: "400",
  style: "regular",
  variable: "--font-lemurmure",
});


export const metadata: Metadata = {
  title: "Ziriguidum",
  description: "An essential Brazilian music mini-course, explained and felt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${charter.variable} ${leMurmure.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
