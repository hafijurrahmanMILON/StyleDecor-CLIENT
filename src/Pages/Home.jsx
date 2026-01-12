import React from "react";
import Hero from "../Components/HomeComponents.jsx/Hero";
import OurServices from "../Components/HomeComponents.jsx/OurServices";
import BestDecorators from "../Components/HomeComponents.jsx/BestDecorators";
import ServiceCoverage from "../Components/HomeComponents.jsx/ServiceCoverage";
import Categories from "../Components/HomeComponents.jsx/Categories";
import Testimonials from "../Components/HomeComponents.jsx/Testimonials";
import Blogs from "../Components/HomeComponents.jsx/Blogs";
import Newsletter from "../Components/HomeComponents.jsx/Newsletter";
import Statistics from "../Components/HomeComponents.jsx/Statistics";
import FAQ from "../Components/HomeComponents.jsx/FAQ";

const Home = () => {
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div>
        <Categories></Categories>
      </div>
      <div className="w-11/12 mx-auto my-16">
        <OurServices></OurServices>
      </div>
      <div className="lg:w-9/12 mx-auto my-16">
        <BestDecorators></BestDecorators>
      </div>
      <div className="my-16">
        <Statistics></Statistics>
      </div>
      <div className="my-16">
        <Testimonials></Testimonials>
      </div>
      <div className="my-16">
        <Blogs></Blogs>
      </div>
      <div className="my-26">
        <ServiceCoverage></ServiceCoverage>
      </div>
      <div className="my-16">
        <FAQ></FAQ>
      </div>
      <div className="my-16">
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
