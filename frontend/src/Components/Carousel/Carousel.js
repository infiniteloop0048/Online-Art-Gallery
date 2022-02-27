import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Height } from "@material-ui/icons";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import './Carousel.css';

function ControlledCarousel() {
  

  return (
    <div className="carousel-item active">
      <div className="container">
        <h1>
          WEample headline
        </h1>
        <p>hahahahah</p>
        <a className="btn btn-primary">Sign up today</a>
      </div>
    </div>
  );
}


export default ControlledCarousel;