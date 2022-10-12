import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Nbar(props) {
  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container fluid>
        <Navbar.Brand href='/'>R-Movie App</Navbar.Brand>
        <Navbar.Brand href=''>Trending</Navbar.Brand>
        <Navbar.Brand href='/Favourites'>Favourites</Navbar.Brand>

        <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-3'
            style={{ maxHeight: "100px" }}
            navbarScroll></Nav>

          <Form
            className='d-flex'
            onSubmit={props.searchMovie}
            autoComplete='off'>
            <FormControl
              type='search'
              placeholder='Movie Search'
              className='me-2'
              aria-label='search'
              name='query'
              value={props.query}
              onChange={props.changeHandler}></FormControl>
            <Button variant='secondary' type='submit'>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nbar;
