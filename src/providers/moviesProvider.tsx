"use client";
import { GenreData, MovieData } from "@/schemas/movies.schemas";
import { api } from "@/services/api";
import {
  ReactNode,
  SetStateAction,
  cache,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface Props {
  children: ReactNode;
}
interface moviesValues {
  movies: MovieData[];
  setMovies: React.Dispatch<SetStateAction<MovieData[]>>;
  movie: MovieData;
  setMovie: React.Dispatch<SetStateAction<MovieData>>;
  movieDestaque: MovieData;
  setMovieDestaque: React.Dispatch<SetStateAction<MovieData>>;
  urlImg: string;
  urlImgDestaque: string;
  setUrlImgDestaque: React.Dispatch<SetStateAction<string>>;
  getDestaque: () => void;
  getBanner: (movieId: number) => void;
  getBannerDestaque: (movieId: number) => void;
  selectedMovie: (movie: MovieData) => void;
  genres: GenreData[];
  setGenres: (genresData: GenreData[]) => void;
}
export const moviesContext = createContext<moviesValues>({} as moviesValues);

export function MoviesProvider({ children }: Props) {
  const [movies, setMovies] = useState<MovieData[] | []>([] as MovieData[]);
  const [movie, setMovie] = useState({} as MovieData);
  const [movieDestaque, setMovieDestaque] = useState({} as MovieData);
  const [urlImgDestaque, setUrlImgDestaque] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [genres, setGenres] = useState<GenreData[]>([] as GenreData[]);
  async function getMovies(): Promise<void> {
    try {
      const res = await api("GET", "/discover/movie");
      console.log(res);
      setMovies(res.results);
    } catch (error) {
      console.log(error);
    }
  }
  const cachedMovies = cache(async () => {
    const movies = await getMovies();
    return movies;
  });

  async function getDestaque() {
    const res = await api("GET", "/discover/movie");
    setMovieDestaque(res.results[0]);
    getBannerDestaque(res.results[0].id);
  }
  async function getBannerDestaque(movieId: number) {
    const res = await api("GET", `/movie/${movieId}/images`, null, true);
    console.log(res);
    const findImg = res.backdrops.find((img: any) => {
      if (
        img.iso_639_1 == "pt" ||
        img.iso_639_1 == "en" ||
        img.iso_639_1 == "uk"
      ) {
        return img;
      }
    });
    setUrlImgDestaque(findImg.file_path);
  }
  async function getBanner(movieId: number) {
    const res = await api("GET", `/movie/${movieId}/images`, null, true);
    const findImg = res.backdrops.find((img: any) => {
      if (
        img.iso_639_1 == "pt" ||
        img.iso_639_1 == "en" ||
        img.iso_639_1 == "uk"
      ) {
        return img;
      }
    });
    console.log(findImg);
    setUrlImg(findImg.file_path);
  }
  function selectedMovie(movie: MovieData) {
    setMovie(movie);
    getBanner(movie.id);
    console.log(movie.title);
  }
  async function getGenres() {
    const res = await api("GET", "/genre/movie/list");
    console.log(res);
    setGenres(res.genres);
  }
  useEffect(() => {
    cachedMovies();
    getDestaque();
    getGenres();
  }, []);
  return (
    <moviesContext.Provider
      value={{
        getBanner,
        getDestaque,
        movie,
        setMovie,
        setUrlImgDestaque,
        urlImgDestaque,
        movies,
        setMovies,
        selectedMovie,
        movieDestaque,
        setMovieDestaque,
        getBannerDestaque,
        genres,
        setGenres,
        urlImg,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
}
export const useMovie = () => useContext(moviesContext);
