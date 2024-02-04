import React from "react";

import Link from "../../../components/Link";

import resume from "../../../assets/Mark_Zhdan_Resume.pdf";

const Resume = () => {
  return (
    <section className="Resume">
      <h2>Resume</h2>

      <Link name="View Resume" link={resume} />
    </section>
  );
};

export default Resume;
