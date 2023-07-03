function ScrollMovies() {
  window.scrollBy({ left: 0, top: 450, behavior: "smooth" });
}

export const useScroll = () => ScrollMovies();
