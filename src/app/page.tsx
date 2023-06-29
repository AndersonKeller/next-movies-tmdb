"use client";
import { Header } from "@/components/header/header";
import { useAuth } from "@/providers/authProvider";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { Movies } from "@/components/Movies/movies";
interface Props {
  children: React.ReactNode;
}

export default function Home({ children }: Props) {
  const { createGuest } = useAuth();
  const cookies = parseCookies();

  useEffect(() => {
    if (!cookies["@next-movies-token"]) {
      createGuest();
    } else {
    }
  }, []);
  return (
    <main>
      <Header />
      <Movies />
      {children}
    </main>
  );
}
