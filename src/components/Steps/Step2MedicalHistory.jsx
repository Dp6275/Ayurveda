import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { motion } from "framer-motion";

const Step2MedicalHistory = () => {
  const { control } = useForm();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Medical History</h2>

      <div className="space-y-4">
        <Controller name="medical_conditions" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Existing Medical Conditions" multiline fullWidth variant="outlined" className="rounded-lg" />
          )}
        />
        <Controller name="allergies" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Allergies (if any)" multiline fullWidth variant="outlined" className="rounded-lg" />
          )}
        />
        <Controller name="medications" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Current Medications" multiline fullWidth variant="outlined" className="rounded-lg" />
          )}
        />
      </div>
    </motion.div>
  );
};

export default Step2MedicalHistory;
