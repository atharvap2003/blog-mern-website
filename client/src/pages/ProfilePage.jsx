import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {formatISO9075} from "date-fns";

export default function ProfilePage() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch("http://localhost:8000/profile-post", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Data:", data);
          setPostData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!postData || postData.length === 0) {
    return <p>You have no Posts.</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6 flex">
            <h2 className="text-3xl font-bold text-gray-900">Userame: Test 10</h2>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Created Blog Posts :
            </h2>
            <ul className="">
              {postData.length > 0 ? (
                postData.map((post) => (
                  <div
                    key={post._id}
                    className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <time className="text-gray-700 mt-2">{formatISO9075(new Date(post.createdAt))}</time>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No blog posts created yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
