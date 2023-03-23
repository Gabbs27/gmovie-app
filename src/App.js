import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Nbar from "./components/Nbar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=8418700a767c9decaae34b99f10abd42";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=8418700a767c9decaae34b99f10abd42&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const favContext = createContext([]);

  //Consumir API de peliculas
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        createFavorite(data.results);
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

  //TODO: Migrar a un FIND
  const handleFavorite = (id, isFavorite) => {
    // const findNewMovie = movies.findIndex((obj) => obj.id === id);
    const newMovies = movies.map((obj) => {
      if (obj.id === id) {
        return { ...obj, isFavorite: !isFavorite };
      }
      return obj;
    });
    setMovies(newMovies);
    findFavorites();
    // const newMovies = movies.map((obj) => {
    //   if (obj.id === id) {
    //     return { ...obj, isFavorite: !isFavorite };
    //   }
    //   return obj;
    // });
  };

  const findFavorites = () => {
    const favs = movies.filter((obj) => obj.isFavorite === true);
    setFavoriteMovies([favs]);
    console.log(favoriteMovies);
    // return data;
    // });
    // if (data.isFavorite === true) {
    //     return { ...data };
    //   }
    //   return data;
    // });
    // if (obj.isFavorite === true) {
    //     return { ...movies, favs };
    //   }
    //   return obj;
    // });
    // setFavoriteMovies(favs);
  };

  return (
    <>
      <Nbar
        searchMovie={searchMovie}
        query={query}
        changeHandler={changeHandler}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home movies={movies} handleFavorite={handleFavorite} />}
          />
          {/* Container - Body */}
          <Route
            path='Favourites'
            element={
              <favContext.Provider value={favoriteMovies}>
                <Favorites />
              </favContext.Provider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
