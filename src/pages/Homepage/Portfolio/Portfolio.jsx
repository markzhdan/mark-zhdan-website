import React from "react";
import "./Portfolio.css";

import PageLink from "../../../components/PageLink";
import Link from "../../../components/Link";

import resume from "../../../assets/Mark_Zhdan_Resum_2024.pdf";

const Portfolio = () => {
  return (
    <section className="Portfolio">
      <h2>Portfolio</h2>

      <div className="PortfolioLink">
        <PageLink name="Projects" link="/projects" />

        <PageLink name="Blogs" link="/blogs" />

        <Link name="Resume" link={resume} />
      </div>
    </section>
  );
};

export default Portfolio;
