import React from "react";
import "./index.css";
import Layout from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

export default function App() {
  const { data: authuser, isLoading } = useQuery({
    queryKey: ["authuser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });
  if (isLoading) {
    return null;
  }
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authuser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authuser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authuser ? <LoginPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}
