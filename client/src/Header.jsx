import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

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
    navigate('/');  
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
              <Link to='/profile'>Profile</Link>
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
