import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../middleware/auth";

const userClient = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Log in for super admin
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await userClient.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!admin) res.status(400).json({ message: "User not found" });
    const passwordMatch = await bcrypt.compare(password, admin.password || "");
    if (passwordMatch) {
      const accessToken = generateAccessToken({
        id: admin.id,
        email: admin.email,
      });
      const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET);
      res.status(200).json({
        data: admin,
        messsage: "Admin logged in successfully",
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (e) {
    console.log(e);
  }
};

// login merchant
export const loginMerchant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await userClient.merchant.findUnique({
      where: {
        email: email,
      },
    });
    if (!merchant) {
      const user = await userClient.user.findUnique({
        where: {
          email: email,
        },
        include: {
          merchants: true,
        },
      });
      // If user not found or not associated with any merchant
      if (!user || !user.merchants) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // Continue with the authentication process using the user's merchant details
      // You can also add additional checks here if needed
      // For example, checking the user's password
      const passwordMatch = await bcrypt.compare(
        password,
        user.merchants[0].password || ""
      );

      if (passwordMatch) {
        const accessToken = generateAccessToken(user.merchants);
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET);
        res.status(200).json({
          data: user.merchants,
          message: "Merchant is logged in",
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        });
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else {
      // log in added users
      // const user = merchant.users.find((user) => user.email === email);
      // if (!user) {
      //   res.status(400).json({ message: "User not found in this merchant" });
      //   return;
      // }

      const passwordMatch = await bcrypt.compare(
        password,
        merchant.password || ""
      );
      if (passwordMatch) {
        const accessToken = generateAccessToken(merchant);
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET);
        res.status(200).json({
          data: merchant,
          message: "Merchant is logged in",
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: merchant,
        });
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal serve error" });
  }
};
// refresh token
export const tokenRefresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });
        const accessToken = generateAccessToken(decoded);
        res.status(201).json({ accessToken: accessToken });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// log in user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) res.status(400).json({ message: "User does not exist" });
    const passwordMatch = await bcrypt.compare(password, user.password || "");
    if (passwordMatch) {
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });
      const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET);
      res.status(200).json({
        data: user,
        message: "Successful login",
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server error" });
  }
};
