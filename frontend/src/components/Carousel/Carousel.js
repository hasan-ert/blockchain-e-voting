import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

//Css Import
import "./Carousel.css";
export default function CustomCarousel({ items, title, subtitle }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const createCarouselItems = () => {
    if (items !== undefined && Array.isArray(items)) {
      return items.map(function (item) {
        return <Carousel.Item>{item}</Carousel.Item>;
      });
    } else if (items !== undefined) {
      return <Carousel.Item>{items}</Carousel.Item>;
    }
  };
  if (items !== undefined && Array.isArray(items) && items.length > 0)
    return (
      <div className="carousel-wrapper">
        <h1>{title}</h1>
        <Carousel
          interval={null}
          activeIndex={index}
          onSelect={handleSelect}
          className="custom-carousel"
        >
          {createCarouselItems()}
        </Carousel>
      </div>
    );
}
