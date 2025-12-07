import React from "react";
import Hero from "../Components/HomeComponents.jsx/Hero";
import OurServices from "../Components/HomeComponents.jsx/OurServices";
import BestDecorators from "../Components/HomeComponents.jsx/BestDecorators";
import ServiceCoverage from "../Components/HomeComponents.jsx/ServiceCoverage";

const Home = () => {
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div className="w-11/12 mx-auto my-16">
        <OurServices></OurServices>
      </div>
      <div className="lg:w-7/12 mx-auto my-16">
        <BestDecorators></BestDecorators>
      </div>
      <div>
        <ServiceCoverage></ServiceCoverage>
      </div>
    </div>
  );
};

export default Home;
