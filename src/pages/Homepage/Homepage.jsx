import React from "react";
import "./Homepage.css";

import AboutMe from "./AboutMe/AboutMe";
import Projects from "./Projects/Projects";
import Resume from "./Resume/Resume";
// import BlogsSection from "./BlogsSection/BlogsSection";
import Socials from "./Socials/Socials";

const Homepage = () => {
  return (
    <main className="Homepage">
      <AboutMe />

      <Projects />

      <Resume />

      {/* <BlogsSection /> */}

      <Socials />
    </main>
  );
};

export default Homepage;
