import Image from "next/image";
import "./layout.css";

import { useMovie } from "@/providers/moviesProvider";

export function DestaqueMovie() {
  const { movieDestaque, urlImgDestaque } = useMovie();
  return (
    <main className="main-destaque-movie">
      <Image
        src={"https://image.tmdb.org/t/p/original/" + urlImgDestaque}
        width={1280}
        height={500}
        alt={movieDestaque.title}
        className="img-destaque"
      />
      <div className="div-movie-data">
        <h3>{movieDestaque.title}</h3>
        <p>
          {movieDestaque.overview}
          <br></br>...
        </p>
      </div>
    </main>
  );
}
