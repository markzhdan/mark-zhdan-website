import React from "react";
import Link from "../../../components/Link";

const AboutMe = () => {
  return (
    <header className="AboutMe">
      <h1>Mark Zhdan</h1>

      <p>
        I'm a software engineer at{" "}
        <Link
          name="Blinkfire Analytics"
          link="https://www.blinkfire.com/landing"
        />
        . I also built{" "}
        <Link name="Curriculo" link="https://usecurriculo.com/" /> to help
        students get organized. Visit{" "}
        <Link name="Post-Plant" link="https://postplant.app/" /> to get better
        at VALORANT.
      </p>
    </header>
  );
};

export default AboutMe;
