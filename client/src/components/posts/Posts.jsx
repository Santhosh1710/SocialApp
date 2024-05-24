import React from 'react'
import './Posts.scss'
import Post from '../post/Post'
function Posts() {
  const posts = [
    {
      id: 1,
      name: 'John Doe',
      userId: 1,
      profilePic: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      img: 'https://images.pexels.com/photos/1037989/pexels-photo-1037989.jpeg?cs=srgb&dl=pexels-hannah-nelson-390257-1037989.jpg&fm=jpg'
    },
    {
      id: 2,
      name: 'John Doe',
      userId: 2,
      profilePic: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      img: 'https://images.pexels.com/photos/1406864/pexels-photo-1406864.jpeg?cs=srgb&dl=pexels-minan1398-1406864.jpg&fm=jpg'
    }
  ];
  return (
    <div className="posts">
      {posts.map(post => (
          <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts