import React from "react";

import PageLink from "../../../components/PageLink";

const BlogsSection = () => {
  return (
    <section className="BlogsSection">
      <h2>Blogs</h2>

      <div className="FeaturedBlogs">
        <PageLink name="Daily Blogs" link="/blogs/daily-blogs" />
        <PageLink name="All Blogs" link="/blogs" />
      </div>
    </section>
  );
};

export default BlogsSection;
