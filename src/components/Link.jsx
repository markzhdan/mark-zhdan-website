import React from "react";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

const Link = ({ name, link }) => {
  const trackEvent = useAnalyticsEventTracker();

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      key={name}
      className="Link"
      onClick={() => trackEvent("Link Clicked", { linkName: name })}
    >
      {name}
    </a>
  );
};

export default Link;
