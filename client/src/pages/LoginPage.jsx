import React from "react";
import { useState } from "react";
import {Navigate} from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function loginUser(e) {
    e.preventDefault();
    const resopnse = await fetch('http://localhost:8000/login',{
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    if(resopnse.ok){
      setRedirect(true)
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
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
}
