import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Nbar from "./components/Nbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import FavContext from "./context/FavContext";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=8418700a767c9decaae34b99f10abd42";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=8418700a767c9decaae34b99f10abd42&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const savedFavs = localStorage.getItem("favoriteMovies");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  //Consumir API de peliculas
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error ${res.status}`);
        }
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setMovies(data.results);
        createFavorite(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Const para crear favoitos
  const createFavorite = (movies) => {
    const moviesWithFavorites = [...movies];
    moviesWithFavorites.forEach(function (movie) {
      movie.isFavorite = false;
    });
    setMovies(moviesWithFavorites);
  };

  //Buscar pelicula
  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = API_SEARCH + `${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleFavorite = (id) => {
    const newMovies = movies.map((movie) => {
      if (movie.id === id) {
        const updatedMovie = { ...movie, isFavorite: !movie.isFavorite };
        if (updatedMovie.isFavorite) {
          setFavoriteMovies((prevFavMovies) => {
            const updatedFavMovies = [...prevFavMovies, updatedMovie];
            localStorage.setItem(
              "favoriteMovies",
              JSON.stringify(updatedFavMovies)
            );
            return updatedFavMovies;
          });
        } else {
          setFavoriteMovies((prevFavMovies) => {
            const updatedFavMovies = prevFavMovies.filter(
              (favMovie) => favMovie.id !== id
            );
            localStorage.setItem(
              "favoriteMovies",
              JSON.stringify(updatedFavMovies)
            );
            return updatedFavMovies;
          });
        }
        return updatedMovie;
      }
      return movie;
    });
    setMovies(newMovies);
  };

  return (
    <>
      <Nbar
        searchMovie={searchMovie}
        query={query}
        changeHandler={changeHandler}
      />
      <FavContext.Provider value={favoriteMovies}>
        <HashRouter>
          <Routes>
            <Route
              exact
              path='/'
              element={<Home movies={movies} handleFavorite={handleFavorite} />}
            />
            {/* Container - Body */}
            <Route exact path='/favorites' element={<Favorites />} />
          </Routes>
        </HashRouter>
      </FavContext.Provider>
    </>
  );
}
export default App;
