import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {formatISO9075} from "date-fns";

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        console.log(postInfo);
      });
    });
  }, []);
  
  if(!postInfo){
    return <h1>Loading...</h1> 
  }
  
  
  return (
    <>
      <div className="post-page">
        <div className="post-page-image-section">
          <img src={`http://localhost:8000/${postInfo.cover}`} className="postPage-Image" alt="Image" />
        </div>
        <h1>{postInfo.title}</h1>
        <time>Post Created At: {formatISO9075(new Date(postInfo.createdAt))}</time>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </>
  );
}
