import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./components/MultiStepForm";
import Profile from "./pages/Profile";
import NutritionPlan from "./pages/NutritionPlan";

// 🔐 Protected Route Component
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is always visible */}
      <div className="pt-20"> {/* Prevent navbar overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<MultiStepForm />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nutrition" element={<NutritionPlan />} />
          </Route>

          {/* Redirect invalid routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
