import React from "react";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

const Link = ({ name, link }) => {
  const gaEventTracker = useAnalyticsEventTracker("Link clicked");

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      key={name}
      className="Link"
      onClick={() => gaEventTracker(name)}
    >
      {name}
    </a>
  );
};

export default Link;
