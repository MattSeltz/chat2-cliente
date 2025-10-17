import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat",
  description: "Chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
