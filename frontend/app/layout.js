import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "./Navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Draft Daddy",
  description: "Best Ball Draft Analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-800">
        <Navigation />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
