import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  //   console.log(slideLength);

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  //   const auto = () => {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   };

  // useEffect(() => {
  //   if (autoScroll) {
  //     const auto = () => {
  //       slideInterval = setInterval(nextSlide, intervalTime);
  //     };
  //     auto();
  //   }
  //   return () => clearInterval(slideInterval);
  // }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
{/* 背 */}
      {sliderData.map((slide, index) => {
        // console.log(slide.heading);
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}//背
                      // 若currentSlide為true則寫入current{opacity:1} 
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {/* 當項次===currentSlide為true時元件被顯示 */}
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
        );
      })}
    </div>
  );
};

export default Slider;
