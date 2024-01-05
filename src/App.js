import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Blogs from "./pages/Blogs/Blogs";
import DailyBlogs from "./pages/Blogs/DailyBlogs/DailyBlogs";
import DailyBlog from "./pages/Blogs/DailyBlogs/DailyBlog";

import ProjectsPage from "./pages/Homepage/Projects/ProjectsPage";

import PredictingTop20 from "./pages/Blogs/SpecialBlogs/PredictingTop20";

function App() {
  const [alignTop, setAlignTop] = useState(false);

  // Used to align the page center main element
  useEffect(() => {
    const checkHeight = () => {
      const pageElements = document.getElementsByClassName("Page");
      if (pageElements.length > 0) {
        const contentHeight = pageElements[0].clientHeight;
        setAlignTop(contentHeight > window.innerHeight);
      }
    };

    const timeoutId = setTimeout(checkHeight, 0);

    window.addEventListener("resize", checkHeight);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkHeight);
    };
  }, []);

  return (
    <Router>
      <main
        className="App"
        style={{ alignItems: alignTop ? "flex-start" : "center" }}
      >
        <Routes>
          <Route exact path="/" element={<Homepage />} />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/blogs/hltv-top-20-prediction-2023"
            element={<PredictingTop20 />}
          />
          <Route path="/blogs/daily-blogs" element={<DailyBlogs />} />
          <Route path="/blogs/:blogId" element={<DailyBlog />} />

          <Route path="*" element={<Homepage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
