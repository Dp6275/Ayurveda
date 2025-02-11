import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("loggedIn") === "true"; // ✅ Check login status

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // ✅ Remove login status
    navigate("/login");
  };

  const bgImageUrl =
    "https://tse3.mm.bing.net/th?id=OIP.YOq0-68LQfnyzl0MVX9a7gHaDb&pid=Api&P=0&h=180/nutrition.jpg";

  return (
    <nav
      className="bg-cover bg-center shadow-md fixed top-0 left-0 w-full z-50"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        {/* Logo and Name */}
        <motion.div
          className="flex items-center space-x-3 text-3xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.UxBI5mXnOMs6SlBqzQRQhQHaFF&pid=Api&P=0&h=180/logo.svg"
            alt="Logo"
            className="h-10"
          />
          <Link to="/">Ayurveda AI</Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-yellow-300 transition">
                Dashboard
              </Link>
              <Link to="/nutrition" className="text-white hover:text-yellow-300 transition">
                Nutrition Plan
              </Link>
              <Link to="/profile" className="text-white hover:text-yellow-300 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-yellow-300 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-yellow-300 font-semibold hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white bg-opacity-90 shadow-md p-5 space-y-4 absolute w-full left-0 top-16"
        >
          <Link to="/" className="block text-green-900 hover:text-yellow-500 transition">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block text-green-900 hover:text-yellow-500 transition">
                Dashboard
              </Link>
              <Link to="/nutrition" className="block text-green-900 hover:text-yellow-500 transition">
                Nutrition Plan
              </Link>
              <Link to="/profile" className="block text-green-900 hover:text-yellow-500 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-yellow-600 font-semibold hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-yellow-600 font-semibold hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-semibold text-center hover:bg-yellow-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
