import React from "react";
import Hero from "../Components/HomeComponents.jsx/Hero";
import OurServices from "../Components/HomeComponents.jsx/OurServices";

const Home = () => {
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div className="w-11/12 mx-auto my-16">
        <OurServices></OurServices>
      </div>
    </div>
  );
};

export default Home;
