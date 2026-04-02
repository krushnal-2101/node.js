import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    roll: {
      type: String,
      enum: ["customer", "provider", "admin", "super-admin"],
      default: "customer",
    },

    profilePic: {
      type: String,
    },

    cloudinaryId: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true },
);


userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});


userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      {
        _id: user._id.toString(),
        roll: user.roll,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};


userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  delete userObject.createdAt;

  delete userObject.updatedAt;

  delete userObject.__v;

  delete userObject.tokens;

  return userObject;
};


const User = mongoose.model("User", userSchema);

export default User;