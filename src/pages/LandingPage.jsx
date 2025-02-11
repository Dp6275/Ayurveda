import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-500 to-green-800 flex flex-col items-center justify-center text-white"
    >
      <h1 className="text-5xl font-bold mb-4 text-center">
        Personalized Ayurveda & Nutrition Planning
      </h1>
      <p className="text-lg text-center max-w-2xl">
        Get a personalized Ayurvedic health plan based on your medical history, lifestyle, and dietary habits.
      </p>

      <div className="flex gap-6 mt-6">
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
          >
            Login
          </motion.button>
        </Link>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LandingPage;
