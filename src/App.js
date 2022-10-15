import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Nbar from "./components/Nbar";
import Home from "./components/Home";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=8418700a767c9decaae34b99f10abd42";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=8418700a767c9decaae34b99f10abd42&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  //Consumir API de peliculas
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  //Buscar pelicula
  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = API_SEARCH + `${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  function handleFavorite(e) {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(true);
  }

  return (
    <>
      <Nbar
        searchMovie={searchMovie}
        query={query}
        changeHandler={changeHandler}
      />

      {/* Container - Body */}
      <Home
        movies={movies}
        isFavorite={isFavorite}
        handleFavorite={handleFavorite}
      />
    </>
  );
}

export default App;
