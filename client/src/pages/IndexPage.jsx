import React, { useState } from "react";
import Post from "../Post";
import { useEffect } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/post").then((response) => {
      response.json().then((posts) => {
          setPosts(posts);
          console.log(posts);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={posts._id} {...post} />)}
    </>
  );
}
