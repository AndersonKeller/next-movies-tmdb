"use client";
import { ReactNode, createContext, useContext } from "react";
interface Props {
  children: ReactNode;
}
interface moviesValues {}
export const moviesContext = createContext<moviesValues>({} as moviesValues);

export function MoviesProvider({ children }: Props) {
  return <moviesContext.Provider value={{}}>{children}</moviesContext.Provider>;
}
export const useMovie = () => useContext(moviesContext);
