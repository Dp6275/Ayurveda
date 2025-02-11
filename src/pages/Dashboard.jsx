import React, { useState, useEffect } from "react";
import Chatbot from "../components/Chatbot";
import MultiStepForm from "../components/MultiStepForm";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const bgImageUrl = "https://tse2.mm.bing.net/th?id=OIP.Ia9HIg9VD460H2uyEdXIlgHaE8&pid=Api&P=0&h=180"; // Replace with your preferred background image

  return (
    <div
      className="relative min-h-screen p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Header Section */}
      <motion.h1
        className="text-5xl font-extrabold text-black text-center drop-shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Personalized Ayurveda & Nutrition Plan
      </motion.h1>

      <motion.p
        className="text-white mt-4 text-center text-lg font-medium drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Based on your responses, here is your customized health plan:
      </motion.p>

      {/* Health Plan Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 rounded-xl shadow-md bg-gray-800 bg-opacity-70">
        {/* Diet Plan */}
        <motion.div className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.05 }}>
          <h2 className="text-2xl font-semibold text-green-700">🥗 Diet Plan</h2>
          <ul className="text-gray-700 mt-3 space-y-2">
            <li>✅ Eat more leafy greens and fruits</li>
            <li>✅ Avoid excessive spicy foods</li>
            <li>✅ Stay hydrated with herbal teas</li>
          </ul>
        </motion.div>

        {/* Exercise Plan */}
        <motion.div className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.05 }}>
          <h2 className="text-2xl font-semibold text-green-700">🏃‍♂️ Exercise Tips</h2>
          <ul className="text-gray-700 mt-3 space-y-2">
            <li>✅ Walk for at least 30 minutes daily</li>
            <li>✅ Practice yoga for flexibility</li>
            <li>✅ Stretch and meditate in the morning</li>
          </ul>
        </motion.div>

        {/* Sleep & Stress */}
        <motion.div className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300" whileHover={{ scale: 1.05 }}>
          <h2 className="text-2xl font-semibold text-green-700">😴 Sleep & Stress</h2>
          <ul className="text-gray-700 mt-3 space-y-2">
            <li>✅ Maintain a consistent sleep schedule</li>
            <li>✅ Practice meditation daily</li>
            <li>✅ Reduce screen time before bed</li>
          </ul>
        </motion.div>
      </div>

      {/* Multi-Step Form */}
      <div className="mt-10 flex justify-center">
        <motion.div
          className="w-full md:w-3/4 lg:w-1/2 bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-4">📝 Complete Your Health Profile</h2>
          <MultiStepForm />
        </motion.div>
      </div>

      {/* Floating Chatbot Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowChatbot(!showChatbot)}
      >
        <MessageCircle size={30} />
      </motion.button>

      {/* Chatbot Popup */}
      {showChatbot && (
        <motion.div
          className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">💬 Chatbot</h2>
            <button className="text-gray-500 hover:text-red-500" onClick={() => setShowChatbot(false)}>✖</button>
          </div>
          <Chatbot />
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
