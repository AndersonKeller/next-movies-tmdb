"use client";

import { useAuth } from "@/providers/authProvider";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { Movies } from "@/components/Movies/movies";
import { Header } from "@/components/header/header";
import { DestaqueMovie } from "@/components/DestaqueMovie/destaqueMovie";
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
      <DestaqueMovie />
      <Movies />
      {children}
    </main>
  );
}
