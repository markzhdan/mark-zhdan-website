import React from "react";

import Entry from "./Entry";

const Dropdown = () => {
  const projects = [
    {
      name: "Post-Plant",
      description:
        "Analytical VALORANT web app created to help players improve and anlyze their gameplay more effectively.",
      linkTitle: "Visit Site",
      link: "https://postplant.app",
    },
    {
      name: "Valbility",
      description: "VALORANT voice and audio accessibility tool.",
      linkTitle: "View GitHub",
      link: "https://github.com/markzhdan/Valbility",
    },
    {
      name: "Morven Cosmetics",
      description:
        "Minecraft server plugin that introduced cosmetics to keep players engaged.",
      linkTitle: "View GitHub",
      link: "https://github.com/markzhdan/cosmetics",
    },
  ];

  return (
    <section className="Dropdown">
      {projects.map((project) => (
        <Entry project={project} />
      ))}
    </section>
  );
};

export default Dropdown;
