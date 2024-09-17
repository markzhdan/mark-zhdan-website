import React from "react";
import Link from "../../../components/Link";

const AboutMe = () => {
  return (
    <header className="AboutMe">
      <h1>Mark Zhdan</h1>

      <p>
        I'm a full-stack web developer and a Computer Science student at the
        University of Illinois Chicago. I made the VALORANT app{" "}
        <Link name="Post-Plant" link="https://postplant.app/" /> to help users
        improve.
      </p>
    </header>
  );
};

export default AboutMe;
