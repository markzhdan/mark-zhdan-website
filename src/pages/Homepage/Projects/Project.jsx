import React, { useState } from "react";
import "./Project.css";

import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";

const Project = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`Project ${isExpanded ? "expanded" : ""}`}>
      <div className="Title" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <FaCaretDown /> : <FaCaretRight className="right" />}
        <p style={{ fontStyle: "normal" }}>{project.name}</p>
      </div>

      <div className="Description">
        {isExpanded && (
          <div className="DescriptionContent">
            <p>{project.description}</p>

            {project.links.map((link) => (
              <a
                href={link.link}
                target="_blank"
                rel="noreferrer"
                className="Link"
                key={link.link}
              >
                {link.linkTitle}
                <HiExternalLink />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
