import { MovieData } from "@/schemas/movies.schemas";
import "./layout.css";
import { api } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cache } from "react";

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
  const cachedMovies = cache(async () => {
    const movies = await getMovies();
    return movies;
  });
  useEffect(() => {
    cachedMovies();
  }, []);
  return (
    <main className="main-movies">
      {movies.map((movie) => (
        <div className="div-img-movie">
          <Image
            className="movie-img"
            key={movie.id}
            alt={movie.title}
            width={400}
            height={600}
            src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path}
          />
        </div>
      ))}
    </main>
  );
}
