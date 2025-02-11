import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import { motion } from "framer-motion";

const Step1BasicInfo = () => {
  const { control } = useForm();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Basic Information</h2>

      <div className="space-y-4">
        <Controller name="name" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Full Name" fullWidth variant="outlined" className="rounded-lg" />
          )}
        />
        <Controller name="age" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Age" type="number" fullWidth variant="outlined" className="rounded-lg" />
          )}
        />
        <Controller name="gender" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} select label="Gender" fullWidth variant="outlined" className="rounded-lg">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          )}
        />
      </div>
    </motion.div>
  );
};

export default Step1BasicInfo;
