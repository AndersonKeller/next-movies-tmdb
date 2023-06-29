import axios from "axios";
export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 5000,
  params: {
    api_key: "500da47715400d554b30348da79088e3",
    language: "pt-BR",
  },
});
