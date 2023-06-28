"use client";
import { Header } from "@/components/header/header";
import { useAuth } from "@/providers/authProvider";
import { useEffect } from "react";
import { parseCookies } from "nookies";
interface Props {
  children: React.ReactNode;
}

export default function Home({ children }: Props) {
  const { createGuest } = useAuth();
  const cookies = parseCookies();

  useEffect(() => {
    if (!cookies["@next-movies-token"]) {
      createGuest();
    }
  }, []);
  return (
    <main>
      <Header />

      {children}
    </main>
  );
}
