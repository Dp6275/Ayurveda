import { useState, useEffect } from "react";

const NutritionPlan = () => {
  const [formData, setFormData] = useState({ user_id: "" });
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const bgImageUrl =
    "https://tse2.mm.bing.net/th?id=OIP.rmPRixai0bGITCeSAZAXrQHaEA&pid=Api&P=0&h=180"; // Background image URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate_diet_plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate diet plan");
      }

      const data = await response.json();
      setNutritionPlan(data);
    } catch (error) {
      console.error("Error generating diet plan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedPlan = localStorage.getItem("nutritionPlan");
    if (nutritionPlan) {
      setNutritionPlan(JSON.parse(storedPlan));
    }
  }, [nutritionPlan]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-lg bg-opacity-80">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Your User ID</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="Enter your User ID"
            className="w-full p-2 border rounded-md"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md">
            Generate Nutrition Plan
          </button>
        </form>

        {loading && <p className="text-center mt-4">Generating plan...</p>}

        {nutritionPlan && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Your Personalized Nutrition Plan:</h3>
            <p>
              <strong>Breakfast:</strong> {nutritionPlan.breakfast}
            </p>
            <p>
              <strong>Lunch:</strong> {nutritionPlan.lunch}
            </p>
            <p>
              <strong>Dinner:</strong> {nutritionPlan.dinner}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPlan;
