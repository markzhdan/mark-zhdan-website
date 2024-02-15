import React, { useState } from "react";
import "./Project.css";
import { useSpring, animated } from "react-spring";

import { HiExternalLink } from "react-icons/hi";

const Project = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // opening animation
  const openAnimation = useSpring({
    maxHeight: isExpanded ? "200px" : "25px",
    config: { friction: 30 },
  });

  return (
    <animated.div className="Project" style={openAnimation}>
      <div className="Title" onClick={() => setIsExpanded(!isExpanded)}>
        <h1
          style={{ fontStyle: "normal", fontWeight: "800", marginLeft: "20px" }}
        >
          {project.name}
        </h1>
      </div>

      <div className="Description">
        <p>{project.description}</p>

        {project.links.map((link) => (
          <a
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="ProjectLink"
            key={link.link}
          >
            {link.linkTitle}

            <HiExternalLink />
          </a>
        ))}
      </div>
    </animated.div>
  );
};

export default Project;
