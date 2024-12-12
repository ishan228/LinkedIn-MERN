import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).send("Please fill all the fields");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).send("Username already exists");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ message: "User created successfully" });

    const profileUrl = process.env.CLIENT_URL + user.username;

    try {
      await sendWelcomeEmail(user.email, user.name, profileUrl);
    } catch (error) {
      console.log("Error in signup sendWelcomeEmail: ", error);
    }
  } catch (error) {
    console.log(`Error in signup controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  res.send("login");
};
export const logout = async (req, res) => {
  res.send("logout");
};
