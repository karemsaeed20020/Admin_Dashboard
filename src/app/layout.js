import { Inter } from "next/font/google";
import "./ui/globals.css";
import { AuthProvider } from "./context/authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Next.js Tutorial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
