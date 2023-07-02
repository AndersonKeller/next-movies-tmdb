import { MovieData } from "@/schemas/movies.schemas";
import "./layout.css";
import { api } from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cache } from "react";

export function Movies() {
  const [movies, setMovies] = useState<MovieData[] | []>([] as MovieData[]);

  async function getMovies(): Promise<void> {
    try {
      const res = await api("GET", "/discover/movie");
      console.log(res);
      // console.log(res.data.results);
      setMovies(res.results);
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
      <section>
        {movies.map((movie, index) => (
          <div
            id={movie.id.toString()}
            className="div-img-movie"
            key={movie.id}
          >
            <Image
              priority={true}
              className="movie-img"
              key={movie.id}
              alt={movie.title}
              width={400}
              height={250}
              src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
