import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: (value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("invalid email");
      }
    },
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("userModel", userSchema);

export default User;