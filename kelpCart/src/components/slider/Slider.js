import React from 'react';

import { useState, useEffect } from 'react';
import "./Slider.scss";
import { sliderData } from './slider-data';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(currentSlide == sliderData.length - 1 ? 0 : currentSlide + 1)
    console.log('nextSlide' + currentSlide);
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide == 0 ? sliderData.length - 1 : currentSlide - 1)
    console.log('prevSlide' + currentSlide);
  }
  
  // 自動播放預設值
  const autoScroll = false
  let slideInterval;
  let intervalTime = 5000;

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);
  return (
    <div className='slider'>
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div key={index}
            className={index === currentSlide ? 'current slide' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Slider