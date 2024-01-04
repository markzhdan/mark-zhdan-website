import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DailyBlog.css";

import raw from "raw.macro";
import BackLink from "../../../components/BackLink";

import Markdown from "react-markdown";
import Prism from "prismjs";
import "prism-themes/themes/prism-one-light.css";

const DailyBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    try {
      const content = raw(`../../../data/DailyBlogsMarkdown/${blogId}.md`);

      content ? setBlog(content) : navigate("/blogs", { replace: true });
    } catch (error) {
      navigate("/blogs", { replace: true });
    }
  }, [blogId, navigate]);

  useEffect(() => {
    Prism.highlightAll();
  }, [blog]);

  return (
    <main className="DailyBlog Page">
      <Markdown className="Markdown">{blog}</Markdown>

      <BackLink goTo={"/blogs/daily-blogs"} />
    </main>
  );
};

export default DailyBlog;
