import { z } from "zod";
export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.number().array(),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.string(),
});
export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type MovieData = z.infer<typeof movieSchema>;
export type GenreData = z.infer<typeof genreSchema>;
