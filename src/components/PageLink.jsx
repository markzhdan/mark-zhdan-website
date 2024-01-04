import React from "react";

import { Link } from "react-router-dom";

const PageLink = ({ name, link }) => {
  return (
    <Link to={link} className="PageLink">
      {name}
    </Link>
  );
};

export default PageLink;
