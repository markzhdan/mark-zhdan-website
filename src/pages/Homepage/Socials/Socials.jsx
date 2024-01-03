import React from "react";
import "./Socials.css";

import Link from "../../../components/Link";

import socials from "../../../data/socials.json";

const Socials = () => {
  return (
    <section className="Socials">
      <h2>Socials</h2>

      <div className="SocialsLinks">
        {socials.map((social) => (
          <Link name={social.name} link={social.link} />
        ))}
      </div>
    </section>
  );
};

export default Socials;
