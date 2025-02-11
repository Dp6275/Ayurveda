import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { motion } from "framer-motion";

const Step4Lifestyle = ({ onNext }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Lifestyle Data:", data);
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lifestyle & Activity</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller name="exercise" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Exercise per week (hours)" type="number" fullWidth variant="outlined" className="rounded-lg" />
          )}
        />

        <Controller name="sleepHours" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Average Sleep (hours)" type="number" fullWidth variant="outlined" className="rounded-lg" />
          )}
        />

       
      </form>
    </motion.div>
  );
};

export default Step4Lifestyle;
