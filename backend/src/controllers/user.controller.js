import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res
        .status(400)
        .json({ message: "username or email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
    });

    newUser.save();
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid credentials",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "login successful",
        authUser: {
          _id: user._id,
          username: user.username,
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", null, { maxAge: 0 }).json({
      message: "logged out successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const userId = req.userId;

  const user = await User.findById({ _id: userId }).select("-password");

  return res.status(201).json({
    user,
  });
};
