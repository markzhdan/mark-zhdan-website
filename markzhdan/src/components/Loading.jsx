import React from "react";

import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <section
      className="Loading"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </section>
  );
};

export default Loading;
