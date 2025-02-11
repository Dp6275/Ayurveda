import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const logoUrl = "https://tse4.mm.bing.net/th?id=OIP.UxBI5mXnOMs6SlBqzQRQhQHaFF&pid=Api&P=0&h=180/logo.svg"; // 🔹 Replace with your actual LOGO URL
  const bgImageUrl = "https://tse3.mm.bing.net/th?id=OIP.YOq0-68LQfnyzl0MVX9a7gHaDb&pid=Api&P=0&h=180/nutrition.jpg"; // 🔹 Replace with your actual BACKGROUND IMAGE URL

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Background Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo at the top */}
        <img src={logoUrl} alt="Logo" className="w-28 h-28 mb-6 drop-shadow-lg" />  

        {/* Title Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center drop-shadow-md">
          <span className="text-white">Personalized </span>
          <span className="text-green-300">Ayurveda</span> & 
          <span className="text-yellow-400"> Nutrition</span> Planning
        </h1>
        <p className="text-lg text-center mt-4 max-w-2xl text-gray-200">
          Get a personalized Ayurvedic health plan based on your medical history, lifestyle, and dietary habits.
        </p>

        {/* Welcome Card (Clickable) */}
        <Link to="/login">
          <div className="bg-white text-green-900 p-8 mt-8 rounded-2xl shadow-xl w-full max-w-lg text-center cursor-pointer 
                          hover:shadow-lg transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold">Welcome to Ayurveda & Nutrition Planner</h2>
            <p className="text-gray-700 mt-3">
              Our AI-driven system analyzes your health data and provides customized Ayurvedic recommendations.
            </p>
          </div>
        </Link>

        {/* Get Started Button */}
        <Link to="/signup">
          <button className="bg-yellow-500 text-green-900 px-8 py-3 mt-8 rounded-full font-semibold text-lg shadow-md 
                              hover:bg-yellow-600 hover:scale-110 transition-all">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
