import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ isSignup }) => {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isSignup ? "Signing Up" : "Logging In"} with`, formData);
    navigate(isSignup ? "/dashboard" : "/home"); // Redirect after authentication
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background-image.jpg')" }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full bg-opacity-90">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {isSignup ? "Create an Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mb-3"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mb-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 mb-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-3">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-green-600 font-semibold hover:underline">
                Login
              </a>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <a href="/signup" className="text-green-600 font-semibold hover:underline">
                Sign Up
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
