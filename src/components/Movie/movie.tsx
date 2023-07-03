import { useMovie } from "@/providers/moviesProvider";
import { GenreData } from "@/schemas/movies.schemas";
import { useEffect, useState } from "react";
import "./layout.css";
import Image from "next/image";
import { url } from "inspector";

export function Movie() {
  const { movie, genres, urlImg } = useMovie();
  const [movieGenres, setMovieGenres] = useState<GenreData[]>(
    [] as GenreData[]
  );
  function setGenres() {
    let filtered: GenreData[] = [];
    genres.filter((genre) => {
      movie.genre_ids.map((id) => {
        if (id == genre.id) {
          filtered.push(genre);
        }
      });
    });
    setMovieGenres(filtered);
  }
  useEffect(() => {
    setGenres();
  }, [movie]);
  return movie.title ? (
    <section className="select-movie-main">
      <div className="genres-div">
        {movieGenres.map((genre) => {
          return <p key={genre.id}>{genre.name}</p>;
        })}
      </div>
      <div className="div-img-title-movie">
        <div className="title-overview-movie">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Lançamento: {movie.release_date}</p>
          <p>Avaliações: {movie.vote_average}</p>
        </div>
        <div className="img-drop-shadow">
          <Image
            src={"https://image.tmdb.org/t/p/original/" + urlImg}
            alt={movie.title}
            width={400}
            height={700}
          />
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}
