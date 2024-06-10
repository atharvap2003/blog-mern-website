import { useState } from "react";
import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Post from "./Post";
import Header from "./Header";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { UserContextProvider } from "./userContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
