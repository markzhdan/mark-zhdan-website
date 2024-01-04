import React from "react";
import "./BackLink.css";

import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const BackLink = ({ goTo }) => {
  return (
    <div className="BackLinkContainer">
      <Link to={goTo} className="BackLink">
        <IoArrowBackOutline className="BackLinkIcon" />
        <p>Go Back</p>
      </Link>
    </div>
  );
};

export default BackLink;
