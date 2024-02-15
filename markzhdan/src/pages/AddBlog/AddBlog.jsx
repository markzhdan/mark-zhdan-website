import React, { useState } from "react";
import "./AddBlog.css";

import AddBlogLogin from "./AddBlogContent/AddBlogLogin";
import AddBlogView from "./AddBlogContent/AddBlogView";

const AddBlog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="AddBlog Page">
      {isLoggedIn ? (
        <AddBlogView />
      ) : (
        <AddBlogLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </main>
  );
};

export default AddBlog;
