import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Auth from "../Auth";

const Login = () => {
  <Auth isSignup={false} />;
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ If already logged in, redirect to dashboard
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // ✅ Store login state
    localStorage.setItem("loggedIn", "true");

    // ✅ Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('https://tse3.mm.bing.net/th?id=OIP.YOq0-68LQfnyzl0MVX9a7gHaDb&pid=Api&P=0&h=180/nutrition.jpg')`, filter: "brightness(50%)" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-96 border border-gray-200 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth variant="outlined" required />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth variant="outlined" required />
            )}
          />

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition shadow-md transform hover:scale-105">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-green-700 font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
