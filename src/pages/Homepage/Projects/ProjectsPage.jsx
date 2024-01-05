import React from "react";
import "./ProjectsPage.css";

import ProjectsList from "./ProjectsList";
import BackLink from "../../../components/BackLink";

const ProjectsPage = () => {
  return (
    <section className="ProjectsPage">
      <ProjectsList />

      <BackLink />
    </section>
  );
};

export default ProjectsPage;
