import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import Product from "../../components/product/Product";
const Home = () => {
  const url= window.location.href;
  const scrollToProduct =()=>{
    if(url.includes("/#products")){
      window.scrollTo(
        {
          top:700,
          behavior:'smooth'
        }
      )
    }
  }
  useEffect(
    ()=>{
      scrollToProduct()
    }
    ,[]
  );
    return (
    <div>

      <Slider />
      <Product/>
    
    </div>
  );
};

export default Home;
