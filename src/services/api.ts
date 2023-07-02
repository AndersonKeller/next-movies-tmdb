import { HTTP_METHOD } from "next/dist/server/web/http";
import next from "next/types";

export const api = async (
  method: HTTP_METHOD,
  endpoint: string,
  body?: any,
  lang?: boolean
) => {
  const axios = {
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: "500da47715400d554b30348da79088e3",
      language: "pt-BR",
    },
  };

  const res = await fetch(
    !lang
      ? `${axios.baseURL}${endpoint}?api_key=${axios.params.api_key}&language=${axios.params.language}`
      : `${axios.baseURL}${endpoint}?api_key=${axios.params.api_key}`,
    {
      method: method,
      body: body,

      next: {
        revalidate: 30,
      },
    }
  );
  return res.json();
};
