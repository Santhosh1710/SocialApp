import React from "react";
import "./Posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts', userId],
    queryFn: async () => {
      const res = await makeRequest.get(`/posts?userId=${userId}`);
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