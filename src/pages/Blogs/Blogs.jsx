import React from "react";
import "./Blogs.css";

import PageLink from "../../components/PageLink";
import BackLink from "../../components/BackLink";

import blogs from "../../data/blogs.json";

const Blogs = () => {
  return (
    <main className="Blogs Page">
      <PageLink name="Daily Blogs" link="/blogs/daily-blogs" />

      {blogs.map((blog) => (
        <PageLink name={blog.title} link={`/blogs/${blog.id}`} key={blog.id} />
      ))}

      <BackLink goTo={"/"} />
    </main>
  );
};

export default Blogs;
