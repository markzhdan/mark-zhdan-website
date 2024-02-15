import React from "react";
import "./Homepage.css";

import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Socials from "./Socials/Socials";

const Homepage = () => {
  return (
    <main className="Homepage Page">
      <AboutMe />

      <Portfolio />

      <Socials />
    </main>
  );
};

export default Homepage;
