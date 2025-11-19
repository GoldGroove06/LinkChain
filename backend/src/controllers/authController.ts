import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import connectMongo from "../lib/connectMongo";
import { User } from "../models/user";

const secret = process.env.JWT_SECRET ?? "a santa at nasa";

type SigninBody = {
  email: string;
  password: string;
};

type SignupBody = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export async function getSignin(req: Request, res: Response): Promise<void> {
  try {
    res.send("signin");
  } catch (error) {
    console.error("error in GETSignin", error);
    res.status(500).send("Internal server error");
  }
}

export async function postSignin(
  req: Request<unknown, unknown, SigninBody>,
  res: Response
): Promise<Response | void> {
  const { email, password } = req.body;

  try {
    await connectMongo();

    const user = await User.findOne({ email }).exec();
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
      maxAge: 3_600_000,
      sameSite: "lax",
      secure: false,
    });

    return res.json({ message: "Logged in" });
  } catch (error) {
    console.error("error in PostSignin", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSignup(req: Request, res: Response): Promise<void> {
  try {
    res.send("signup");
  } catch (error) {
    console.error("error in Signup", error);
    res.status(500).send("Internal server error");
  }
}

export async function postSignup(
  req: Request<unknown, unknown, SignupBody>,
  res: Response
): Promise<Response | void> {
  try {
    await connectMongo();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, confirmPassword, username } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ errors: "Password does not match" });
    }

    if (!name || !email || !password || !username) {
      return res.status(400).json({ errors: "Missing required fields" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      email,
      name,
      password: hashedPassword,
      username,
    });

    return res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("error in PostSignup", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
