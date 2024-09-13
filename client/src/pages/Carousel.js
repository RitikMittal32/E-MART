import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Ensure you create this CSS file

export const Carousel = ({ Icons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Icons.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Adjust the interval time (in milliseconds) as needed

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [Icons.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Icons.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Icons.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider">
      <button className="carousel-control prev" onClick={handlePrev}>
        &lt;
      </button>
      <div className="icons-slider">
        {Icons.map((item, index) => (
          <div
            key={index}
            className={`icons ${index === currentIndex ? "active" : ""}`}
          >
            <img src={item.imgs} alt="logo" />
          </div>
        ))}
      </div>
      <button className="carousel-control next" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

