import React from "react";
import MovieBox from "./MovieBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = ({ movies, handleFavorite }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        {movies.map((movie) => (
          <Col key={movie.id} md={4} lg={3} className='mb-4'>
            <MovieBox
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              isFavorite={movie.isFavorite}
              handleFavorite={handleFavorite}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
