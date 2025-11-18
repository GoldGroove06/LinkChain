import { body } from "express-validator";
import mongoose from "mongoose";
import User from "../models/user.js";
import connectMongo from "../lib/connectMongo";

const emailCheck = () => {
  return body("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (value) => {
      console.log("Checking email in Mongo...");
      await connectMongo();
      const existingUser = await User.findOne({ email: value });

      if (existingUser) {
        console.log("Duplicate email found");
        throw new Error("A user already exists with this e-mail address");
      }
    });
};

export default emailCheck;