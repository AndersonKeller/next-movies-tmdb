import "./layout.css";
import Image from "next/image";
import { useMovie } from "@/providers/moviesProvider";
import { MovieData } from "@/schemas/movies.schemas";

import { useScroll } from "@/hooks/scrollHook";

interface Props {
  movies: MovieData[];
  title: string;
}
export function Movies({ movies, title }: Props) {
  const { selectedMovie } = useMovie();

  function selectMovie(movie: MovieData) {
    selectedMovie(movie);

    useScroll();
  }
  return (
    <main className="main-movies">
      <h2>{title}</h2>
      <section>
        {movies.map((movie, index) => (
          <div
            id={movie.id.toString()}
            className="div-img-movie"
            key={movie.id}
            onClick={() => selectMovie(movie)}
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
