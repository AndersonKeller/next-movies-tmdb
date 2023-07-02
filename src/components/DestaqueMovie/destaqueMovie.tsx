import { MovieData } from "@/schemas/movies.schemas";
import Image from "next/image";
import "./layout.css";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function DestaqueMovie() {
  const [movie, setMovie] = useState({} as MovieData);
  const [urlImg, setUrlimg] = useState("");
  async function getDestaque() {
    const res = await api("GET", "/discover/movie");
    setMovie(res.results[0]);
    getBanner(res.results[0].id);
  }
  async function getBanner(movieId: number) {
    const res = await api("GET", `/movie/${movieId}/images`, null, true);
    console.log(res);
    const findImg = res.backdrops.find((img: any) => {
      if (img.iso_639_1 == "pt" || img.iso_639_1 == "en") {
        return img;
      }
    });
    setUrlimg(findImg.file_path);
  }
  useEffect(() => {
    getDestaque();
  }, []);

  return (
    <main className="main-destaque-movie">
      <Image
        src={"https://image.tmdb.org/t/p/original/" + urlImg}
        width={1280}
        height={500}
        alt={movie.title}
        className="img-destaque"
      />
      <div className="div-movie-data">
        <h3>{movie.title}</h3>
        <p>
          {movie.overview}
          <br></br>...
        </p>
      </div>
    </main>
  );
}
