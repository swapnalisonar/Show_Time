import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieBox = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleBookTicket = () => {
    setMessage(
      <div>
        <h5 className="mb-3">Booking Confirmation</h5>
        <p>
          You have successfully booked a ticket for the movie we will sent more
          detils on email:
        </p>
        <h6 className="mb-3">{title}</h6>
      </div>
    );
    setShow(false);
  };

  // Calculate the star rating based on the vote average
  const starRating = Math.round(vote_average / 2);

  return (
    <div className="card text-center bg-secondary mb-3">
      <div className="card">
        <img className="card-img-top" src={API_IMG + poster_path} />
        <div className="card-body">
          <button type="button" className="btn btn-dark" onClick={handleShow}>
            View More
          </button>
          <div className="mt-2">
            {[...Array(starRating)].map((_, i) => (
              <FontAwesomeIcon icon={faStar} key={i} className="text-warning" />
            ))}
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top"
                style={{ width: "14rem" }}
                src={API_IMG + poster_path}
              />
              <h4>IMDb: {vote_average}</h4>
              <h5>Release Date: {release_date}</h5>
              <br></br>
              <h6>Overview</h6>
              <p>{overview}</p>
              {message ? (
                <div className="alert alert-success mt-2" role="alert">
                  {message}
                </div>
              ) : (
                <form onSubmit={handleBookTicket}>
                  <div className="form-group">
                    <label htmlFor="emailInput">
                      Enter your email address:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="example@example.com"
                      required
                    />
                  </div>
                  <Button id="movie-btn" variant="primary" type="submit">
                    Book Ticket
                  </Button>
                </form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {message && (
            <div className="alert alert-success mt-2" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
