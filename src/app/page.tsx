"use client";

import { useAuth } from "@/providers/authProvider";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { Movies } from "@/components/Movies/movies";
import { Header } from "@/components/header/header";
import { DestaqueMovie } from "@/components/DestaqueMovie/destaqueMovie";
import { useMovie } from "@/providers/moviesProvider";
import { Movie } from "@/components/Movie/movie";
interface Props {
  children: React.ReactNode;
}

export default function Home({ children }: Props) {
  const { createGuest } = useAuth();
  const { movies } = useMovie();
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
      <Movies title="Em Destaque" movies={movies} />
      <Movie />
      {children}
    </main>
  );
}
