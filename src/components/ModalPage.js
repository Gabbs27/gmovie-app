import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalPage(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className='card-img-top'
          style={{ width: "14rem" }}
          src={props.API_IMG + props.poster_path}
          alt={props.title}
        />
        <h3 style={{ color: "black" }}>{props.title}</h3>
        <h4>IMDb: {props.vote_average}</h4>
        <h5>Release Date: {props.release_date}</h5>
        <br></br>
        <h6>Overview</h6>
        <p>{props.overview}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPage;
