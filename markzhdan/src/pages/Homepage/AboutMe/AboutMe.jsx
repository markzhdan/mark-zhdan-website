import React from "react";
import Link from "../../../components/Link";

const AboutMe = () => {
  return (
    <header className="AboutMe">
      <h1>Mark Zhdan</h1>

      <p>
        I'm a full-stack web developer and CS student at the University of
        Illinois Chicago. I made{" "}
        <Link name="Curriculo" link="https://usecurriculo.com/" /> to help
        students get organized. Visit{" "}
        <Link name="Post-Plant" link="https://postplant.app/" /> to get better
        at VALORANT.
      </p>
    </header>
  );
};

export default AboutMe;
