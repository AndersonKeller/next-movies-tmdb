import { AuthProvider } from "@/providers/authProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/header/header";
import { MoviesProvider } from "@/providers/moviesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Movies",
  description: "A project for your find new movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MoviesProvider>{children}</MoviesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
