import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Header() {
  const { setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;


  return (
    <>
      <header>
        <Link to="/" className="logo">
          MyBlogs
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}

          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
