import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import { motion } from "framer-motion";

const Step3DietaryHabits = ({ onNext }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Dietary Habits Data:", data);
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dietary Habits</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller name="dietType" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} select label="Diet Type" fullWidth variant="outlined" className="rounded-lg">
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="non-vegetarian">Non-Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
            </TextField>
          )}
        />

        <Controller name="eatingFrequency" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Meals per day" type="number" fullWidth variant="outlined" className="rounded-lg" />
          )}
        />

       
      </form>
    </motion.div>
  );
};

export default Step3DietaryHabits;
