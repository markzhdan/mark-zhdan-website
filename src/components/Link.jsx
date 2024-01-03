import React from "react";
import "./Link.css";

const Link = ({ name, link }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" key={name} className="Link">
      {name}
    </a>
  );
};

export default Link;
