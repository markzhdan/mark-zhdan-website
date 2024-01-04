import React from "react";

import PageLink from "../../../components/PageLink";

const BlogsSection = () => {
  return (
    <section className="BlogsSection">
      <h2>Blogs</h2>

      <PageLink name="See All Blogs" link="/blogs" />
    </section>
  );
};

export default BlogsSection;
