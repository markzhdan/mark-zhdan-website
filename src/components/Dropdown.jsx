import React from "react";

import Entry from "./Entry";

const Dropdown = () => {
  const projects = [
    {
      name: "Post-Plant",
      description:
        "Analytical VALORANT web app created to help players improve and analyze their gameplay more effectively.",
      links: [{ linkTitle: "Visit Site", link: "https://postplant.app" }],
    },
    {
      name: "Valbility",
      description: "VALORANT voice and audio accessibility widget.",
      links: [
        {
          linkTitle: "View GitHub",
          link: "https://github.com/markzhdan/Valbility",
        },
      ],
    },
    {
      name: "Minecraft Plugins",
      description:
        "Server plugins used by 150+ players that introduced cosmetics, dimensions, and loot chests.",
      links: [
        {
          linkTitle: "Cosmetics",
          link: "https://github.com/markzhdan/cosmetics",
        },
        {
          linkTitle: "Dimensions",
          link: "https://github.com/markzhdan/portal-codes",
        },
        {
          linkTitle: "Loot Chests",
          link: "https://github.com/markzhdan/farm-chest",
        },
        {
          linkTitle: "Discord Bot",
          link: "https://github.com/markzhdan/trial-discord-bot",
        },
      ],
    },
  ];

  return (
    <section className="Dropdown">
      {projects.map((project) => (
        <Entry project={project} key={project.name} />
      ))}
    </section>
  );
};

export default Dropdown;
