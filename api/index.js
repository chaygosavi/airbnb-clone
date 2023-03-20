import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const bcryptSalt = await bcrypt.genSaltSync(9);
const jwtSecret = "snfsdlfnjsdifnsdfinjs";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get("/text", (req, res) => {
  res.json("testt ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passOk = await bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.status(200).cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json(user);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(9999);
