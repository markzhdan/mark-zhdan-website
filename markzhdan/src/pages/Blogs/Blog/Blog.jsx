import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Blog.css";

import BackLink from "../../../components/BackLink";

import Markdown from "react-markdown";
import Prism from "prismjs";
import "prism-themes/themes/prism-one-light.css";

import Loading from "../../../components/Loading";

import { fetchBackend } from "../../../api/api";

const Blog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [isDailyBlog, setIsDailyBlog] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBackend(`/daily-blogs/${blogId}`);

        if (!response) {
          navigate("/blogs", { replace: true });
          throw new Error("Failed to fetch blog");
        }

        setBlog(response);
      } catch (err) {
        // console.log("Fetch error:", err);
      }
    };

    fetchBlog();
  }, [blogId, navigate]);

  useEffect(() => {
    const dateFormatRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
    setIsDailyBlog(dateFormatRegex.test(blogId));

    Prism.highlightAll();
  }, [blog]);

  return (
    <main className={`Page Blog ${isDailyBlog ? "DailyBlog" : "SpecialBlog"}`}>
      {blog ? <Markdown className="Markdown">{blog}</Markdown> : <Loading />}

      <BackLink />
    </main>
  );
};

export default Blog;
