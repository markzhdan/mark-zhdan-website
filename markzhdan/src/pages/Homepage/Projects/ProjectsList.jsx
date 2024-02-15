import React from "react";

import Project from "./Project";

import projects from "../../../data/projects.json";

const ProjectsList = () => {
  return (
    <section className="ProjectsList">
      {projects.map((project) => (
        <Project project={project} key={project.name} />
      ))}
    </section>
  );
};

export default ProjectsList;
