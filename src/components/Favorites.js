import React, { useState, useContext } from "react";
import NotFound from "./NotFound";
import Moviebox from "./MovieBox";

// function handleFavorite(movie.isFavorite, moviesWithFavorites.id) {
//     // e.stopPropagation();
//     // e.preventDefault();

//   }

function Home(props) {
  const favMovies = useContext(props.favContext);
  return (
    <div>
      {props.movies.length > 0 ? (
        <div className='container'>
          <div className='moviebox--grid'>
            {favMovies.map((moviereq) => (
              <Moviebox
                key={moviereq.id}
                id={moviereq.id}
                title={moviereq.title}
                vote_average={moviereq.vote_average}
                release_date={moviereq.release_date}
                poster_path={moviereq.poster_path}
                overview={moviereq.overview}
                isFavorite={moviereq.isFavorite}
                handleFavorite={props.handleFavorite}
              />
            ))}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Home;
