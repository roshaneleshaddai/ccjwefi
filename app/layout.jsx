import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobs",
  description: "hospital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <SessionWrapper>
        {children}
        </SessionWrapper>
        </body>
      
    </html>
  );
}


