import { generateAccessToken } from "../middle_ware/auth";
import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user;

const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

// createUser
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "input name or email" });
    }
    const merchant = await userClient.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res
      .status(201)
      .json({ data: merchant, message: "Account created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server Error" });
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
// log in
export const loginUser = async (req, res) => {
  const email = req.body.email;
  const user = { name: email };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
};
