import React from "react";
import "./Posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Posts() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await makeRequest.get("/posts");
      return res.data; 
    },
  });
  return (
    <div className="posts">
      { error ? (<p>Something went wrong!</p> ):
      isLoading ? (<p>Loading...</p>):
      data?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;