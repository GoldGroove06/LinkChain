import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;