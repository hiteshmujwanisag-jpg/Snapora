"use client";

import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect, useRef } from "react";
import { loadUserFromStorage } from "@/store/slice/authSlice";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(loadUserFromStorage());
      initialized.current = true;
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
