import React, { useContext } from "react";
import FavContext from "../context/FavContext"; // Adjust the path as necessary
import NotFound from "./NotFound";
import Moviebox from "./MovieBox";

const Favorites = () => {
  const favoriteMovies = useContext(FavContext);

  return (
    <div>
      {favoriteMovies.length > 0 ? (
        <div className='container'>
          <div className='moviebox--grid'>
            {favoriteMovies.map((movie) => (
              <Moviebox
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                poster_path={movie.poster_path}
                overview={movie.overview}
                isFavorite={movie.isFavorite}
                handleFavorite={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Favorites;
