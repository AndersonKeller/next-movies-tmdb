import { MovieData } from "@/schemas/movies.schemas";
import { api } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Movies() {
  const [movies, setMovies] = useState<MovieData[]>([] as MovieData[]);
  async function getMovies(): Promise<void> {
    try {
      const res = await api.get("/discover/movie");
      console.log(res.data.results);
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <main>
      {movies.map((movie) => (
        <Image
          key={movie.id}
          alt={movie.title}
          width={400}
          height={600}
          src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path}
        />
      ))}
    </main>
  );
}
