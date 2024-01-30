import { generateAccessToken } from "../middle_ware/auth";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// createUser
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email) {
      res.status(400).json({ error: "input name or email" });
    }
    const user = await userClient.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    res
      .status(201)
      .json({ data: user, message: "Account created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server Error" });
  }
};
// log in
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userClient.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) res.status(400).json({ message: "User does not exist" });
    const passwordMatch = await bcrypt.compare(password, user.password || "");
    if (passwordMatch) {
      res.status(200).json({ data: user, message: "Successful login" });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign( process.env.REFRESH_TOKEN_SECRET);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }

};
// updateUser
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userClient.update({
      where: {
        id: userId,
      },
      data: userData,
    });
    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
// deleteUser
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userClient.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
};
// getAllUser
export const getAllUser = async (req, res) => {
  try {
    const allUser = await userClient.findMany({});

    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};
// getUsertById
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userClient.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
