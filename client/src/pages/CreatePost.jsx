import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    e.preventDefault();
    const response = await fetch("http://localhost:8000/post", {
      method: "POST",
      body: data,
    });
    if(response.ok){
      setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"title"}
          required
        />
        <input
          type="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          min={10}
          placeholder={"summary"}
          required
        />
        <input
          type="file"
          required
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Creat Post</button>
      </form>
    </div>
  );
}
