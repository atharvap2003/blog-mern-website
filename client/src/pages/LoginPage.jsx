import React, { useContext } from "react";
import { useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login',{
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }
    else{
      alert('Wrong Credentials');
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <>
      <form className="login" onSubmit={loginUser}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </>
  );
}
