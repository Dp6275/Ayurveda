import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "25",
    healthGoals: "Weight loss & better digestion",
  });

  useEffect(() => {
    // Fetch user details from localStorage (if stored)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: storedUser.fullName || "User Name",
        email: storedUser.email || "user@example.com",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    // Clear user session and redirect to login
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  const bgImageUrl =
    "https://tse1.mm.bing.net/th?id=OIP.TCW9uWHn5-iCBIS-qtf26QHaEJ&pid=Api&P=0&h=180";

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md bg-opacity-90">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-xl font-bold">
            {formData.fullName.charAt(0)}
          </div>
        </div>

        {/* Profile Header */}
        <h2 className="text-3xl font-bold text-center mt-4">Profile</h2>

        {/* Profile Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border ${
                isEditing ? "border-gray-400" : "bg-gray-100"
              } focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border ${
                isEditing ? "border-gray-400" : "bg-gray-100"
              } focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Health Goals</label>
            <textarea
              name="healthGoals"
              value={formData.healthGoals}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border ${
                isEditing ? "border-gray-400" : "bg-gray-100"
              } focus:outline-none`}
            ></textarea>
          </div>

          {/* Edit/Save Button */}
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg shadow-md transition-all ${
              isEditing ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full mt-3 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-lg shadow-md transition-all"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
