import React, { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";
import "./Entry.css";

const Entry = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`Entry ${isExpanded ? "expanded" : ""}`}>
      <div className="Title" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <FaCaretDown /> : <FaCaretRight className="right" />}
        <p style={{ fontStyle: "normal" }}>{project.name}</p>
      </div>

      <div className="Description">
        {isExpanded && (
          <div className="DescriptionContent">
            <p>{project.description}</p>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="Link"
            >
              {project.linkTitle}
              <HiExternalLink />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entry;
