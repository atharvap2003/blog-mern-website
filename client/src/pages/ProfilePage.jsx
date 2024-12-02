import React, { useEffect, useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../userContext";

export default function ProfilePage() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo, setUserInfo } = useContext(UserContext);
  const username = userInfo?.username;

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

  const handleDeletePost = (postId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!userConfirmed) {
      return;
    }

    fetch(`http://localhost:8000/profile-post/${postId}`, {
      method: "DELETE",
      credentials: "include", // Ensures cookies are included
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Delete response:", data);
        // Removed the deleted post from the UI without re-fetching
        setPostData((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <>
      <section className="profile-page-section">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="text-center mb-6 flex">
            <p className="text-sm font-bold text-gray-900">
              Userame: {username}
            </p>
          </div>
          <div className="">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Created Blog Posts :
            </h4>
            <ul className="profile-post">
              {postData.length > 0 ? (
                postData.map((post) => (
                  <div
                    key={post._id}
                    className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center profile-post-section"
                  >
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </h4>
                      <div className="profile-post-page">
                        Created at : <br />
                        <time className="text-gray-700 mt-2">
                          {formatISO9075(new Date(post.createdAt))}
                        </time>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 post-section-button"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <>
                  <div className="text-center mb-6 flex">
                    <p className="text-sm font-bold text-gray-900">
                      Userame: {username}
                    </p>
                  </div>
                  <p className="text-gray-700 profile-page-section">
                    No blog posts created yet.
                  </p>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
