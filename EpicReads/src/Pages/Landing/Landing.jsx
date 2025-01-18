import React from "react";
import Hero from "../../Components/Hero/Hero";
import "./Landing.css";
import Navbar from "../../Components/Navbar/NavigationBar";
import Grid from "../../Components/Grid/Grid";

const Landing = () => {
  return (
    <div>
        <Navbar />
      <div className="back">
        <Hero />
      </div>
      <div className="books">
        <div className="title_1">
          <h1>Trending Books</h1>
        </div>
        <Grid index={8} />
      </div>
    </div>
  );
};

export default Landing;
