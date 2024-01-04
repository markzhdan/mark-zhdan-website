import React, { useState } from "react";
import "./Project.css";
import { useSpring, animated } from "react-spring";

import { FaCaretRight } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

const Project = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // opening animation
  const openAnimation = useSpring({
    maxHeight: isExpanded ? "200px" : "25px",
    config: { friction: 30 },
  });

  //rotate animation
  const iconAnimation = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" },
    config: { duration: 120 },
  });

  return (
    <animated.div className="Project" style={openAnimation}>
      <div className="Title" onClick={() => setIsExpanded(!isExpanded)}>
        <animated.i className="TitleIcon" style={iconAnimation}>
          <FaCaretRight style={iconAnimation} />
        </animated.i>
        <p style={{ fontStyle: "normal" }}>{project.name}</p>
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
