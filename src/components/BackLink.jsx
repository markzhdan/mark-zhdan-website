import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackLink.css";

import { IoArrowBackOutline } from "react-icons/io5";

const BackLink = () => {
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div className="BackLinkContainer" onClick={goToPreviousPage}>
      <IoArrowBackOutline className="BackLinkIcon" />
      <p>Go Back</p>
    </div>
  );
};

export default BackLink;
