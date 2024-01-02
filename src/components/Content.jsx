import React from "react";
import "./Content.css";

import Dropdown from "./Dropdown";

import resume from "../assets/Mark_Zhdan_Resume.pdf";

const Content = () => {
  return (
    <main className="Content">
      <main className="AboutMe">
        <h1>Mark Zhdan</h1>
        <p>
          I'm a full-stack web developer and a Computer Science student at the
          University of Illinois Chicago. Looking for a summer 2024 internship.
        </p>
      </main>

      <section className="Projects">
        <h2>Projects</h2>
        <Dropdown />
      </section>

      <section className="Resume">
        <h2>Resume</h2>
        <a href={resume} target="_blank" rel="noreferrer">
          View Resume
        </a>
      </section>

      {/* <section className="Blogs">
        <h2>Blogs</h2>
      </section> */}

      <section className="Socials">
        <h2>Socials</h2>
        <div className="SocialsContent">
          <a
            href="https://github.com/markzhdan"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/mark_zhdan"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/markzhdan/"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a href="mailto:markzhdan@gmail.com" target="_blank" rel="noreferrer">
            Email
          </a>
        </div>
      </section>
    </main>
  );
};

export default Content;
