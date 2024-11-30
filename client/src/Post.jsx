import React, { useState } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  author,
  summary,
  cover,
  content,
  createdAt,
}) {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            {/* <img
              className="Imageurl"
              src="../src/assets/cloud-services-isometric-composition-with-big-cloud-computing-infrastructure-elements-connected-with-dashed-lines-vector-illustration_1284-30495.avif"
              alt="image"
            /> */}
            <img className="Imageurl" src={`http://localhost:8000/${cover}`} alt="image" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </>
  );
}
