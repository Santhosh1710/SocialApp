import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import "./home.scss";

import React from "react";
function home() {
  return (
    <div className="home">
      <Stories />
      <Posts />
    </div>
  )
}

export default home