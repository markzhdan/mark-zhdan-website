import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Blogs from "./pages/Blogs/Blogs";
import DailyBlogs from "./pages/Blogs/DailyBlogs/DailyBlogs";
import Blog from "./pages/Blogs/Blog/Blog";
import AddBlog from "./pages/AddBlog/AddBlog";

import ProjectsPage from "./pages/Homepage/Projects/ProjectsPage";
import Plausible from "plausible-tracker";

const App = () => {
  const location = useLocation();
  const [alignTop, setAlignTop] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const plausible = Plausible({
      domain: "markzhdan.com",
    });

    plausible.trackPageview();
  }, [location]);

  useEffect(() => {
    const checkHeight = () => {
      const pageElements = document.getElementsByClassName("Page");
      if (pageElements.length > 0) {
        const contentHeight = pageElements[0].clientHeight;
        setAlignTop(contentHeight > window.innerHeight);
      }
    };

    checkHeight();
    const timeoutId = setTimeout(checkHeight, 0);

    window.addEventListener("resize", checkHeight);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkHeight);
    };
  }, [location, blog]);

  useEffect(() => {
    setBlog(null);
  }, [location]);

  return (
    <main
      className="App"
      style={{ alignItems: alignTop ? "flex-start" : "center" }}
    >
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/add-blog" element={<AddBlog />} />

        <Route path="/blogs/daily-blogs" element={<DailyBlogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/blogs/:blogId"
          element={<Blog blog={blog} setBlog={setBlog} />}
        />

        <Route path="*" element={<Homepage />} />
      </Routes>
    </main>
  );
};

export default App;
