import jwt from "jsonwebtoken";
import bcryct from "bcrypt";
import connectMongo from "../lib/connectMongo";
import User from "../models/user";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";


const secret = "a santa at nasa";


export async function getSignin(req, res) {
  try {
    res.send("signin");
  } catch {
    console.log("error in GETSignin");
  }
}

export async function postSignin(req, res) {
  const { email, password } = req.body;
  try {
    await connectMongo(); // ensure DB connection

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 3600000,
    });

    return res.json({ message: "Logged in" });
  } catch (error) {
    console.error(error);
    console.log("error in PostSignin");
  }
}




export async function getSignup(req, res) {
  try {
    res.send("signup");
  } catch {
    console.log("error in Signup");
  }
}

export async function postSignup(req, res) {
  try {
    await connectMongo(); // ensure DB connection
     console.log("in signup...");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirmPassword, username } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ errors: "password does not match" });
    }

    if (name && email && password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Create new user
      await User.create({
        name,
        email,
        password: hashedPassword,
        username
      });


      return res.status(200).json({ m: "signup successful" });
    }

    res.status(500).send("internal server error");
  } catch (error) {
    console.error(error);
    console.log("error in PostSignup");
  }
}

