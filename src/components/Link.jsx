import React from "react";

const Link = ({ name, link }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" key={name} className="Link">
      {name}
    </a>
  );
};

export default Link;
