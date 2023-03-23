import React from "react";
import NotFound from "./NotFound";
import Moviebox from "./MovieBox";

function Home(props) {
  return (
    <div>
      {props.movies.length > 0 ? (
        <div className='container'>
          <div className='moviebox--grid'>
            {props.movies.map((moviereq) => (
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
