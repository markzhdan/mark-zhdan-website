import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Blog.css";

import raw from "raw.macro";
import BackLink from "../../../components/BackLink";

import Markdown from "react-markdown";
import Prism from "prismjs";
import "prism-themes/themes/prism-one-light.css";

const Blog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [isDailyBlog, setIsDailyBlog] = useState(true);

  useEffect(() => {
    let content = raw(`../../../data/DailyBlogsMarkdown/${blogId}.md`);

    if (content) {
      setBlog(content);
      return;
    } else {
      content = raw(`../../../data/SpecialBlogsMarkdown/${blogId}.md`);
      content ? setBlog(content) : navigate("/blogs", { replace: true });
      setIsDailyBlog(false);
    }
  }, [blogId, navigate]);

  useEffect(() => {
    Prism.highlightAll();
  }, [blog]);

  return (
    <main className={`Page Blog ${isDailyBlog ? "DailyBlog" : "SpecialBlog"}`}>
      <Markdown className="Markdown">{blog}</Markdown>

      <BackLink />
    </main>
  );
};

export default Blog;
