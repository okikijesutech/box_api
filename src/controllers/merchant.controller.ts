import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../middleware/auth";
import emailService from "services/emailService";

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userClient = new PrismaClient();

// createMerchant
export const createMerchant = async (req, res) => {
  try {
    const { name, email, password, shopName, merchantType } = req.body;

    const existingMerchant = await userClient.merchant.findUnique({
      where: {
        email: email,
      },
    });

    if (existingMerchant) {
      res.status(400).json({ message: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !shopName) {
      res.status(400).json({ message: "Input your name or email" });
      return;
    }
    const merchant = await userClient.merchant.create({
      data: {
        name: name,
        email: email,
        shopName: shopName,
        password: hashedPassword,
        merchantType: merchantType,
      },
    });
    res.status(200).json({ data: merchant });
  } catch (e) {
    console.log(e);
  }
};
// loginMerchant
export const loginMerchant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const merchant = await userClient.merchant.findUnique({
      where: {
        email: email,
      },
      include: {
        users: true,
      },
    });
    if (!merchant) res.status(400).json({ message: "Merchant doesn't exsit" });

    // log in added users
    const user = merchant.users.find((user) => user.email === email);
    if (!user) {
      res.status(400).json({ message: "User not found in this merchant" });
      return;
    }

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
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal serve error" });
  }
};
// refresh token
export const tokenRefresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null)
    return res.status(401).json({ message: "Refresh token is required" });
  if (!refreshToken.include(refreshToken)) return res.status(403);
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.status(201).json({ accessToken: accessToken });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getAllMerchant
export const getAllMerchant = async (req, res) => {
  try {
    const allMerchant = await userClient.merchant.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json(allMerchant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getMerchantById
export const getMerchantById = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchant = await userClient.merchant.findUnique({
      where: {
        id: merchantId,
      },
      include: {
        products: true,
      },
    });
    res.status(200).json(merchant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// updateMerchant
export const updateMerchant = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const { name, shopName, merchantType, accName, accNo } = req.body;
    const merchant = await userClient.merchant.update({
      where: {
        id: merchantId,
      },
      data: {
        name: name,
        shopName: shopName,
        merchantType: merchantType,
        accName: accName,
        accNo: accNo,
      },
    });
    res.status(200).json({ data: merchant, message: "Merchant Updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// forgotPassword
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const merchant = await userClient.merchant.findUnique({
      where: {
        email: email,
      },
    });
    if (!merchant) {
      return res.status(400).json({ message: "Merchant does not exist" });
    }
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http/localhost:3000/reset-password?token=${token}`;
    await emailService.sendEmail(
      email,
      "Password Reset",
      `Click link to reset your password: ${resetLink}`
    );
    res.status(200).json({ message: "Password reset email sent succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// reset password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { email } = decoded;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userClient.merchant.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });
    });
    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ meassage: "Internal server error" });
  }
};
// deleteMerchant
export const deleteMerchant = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchant = await userClient.merchant.delete({
      where: {
        id: merchantId,
      },
    });
    res.status(200).json({ message: "deleted the user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// add users to merchant
export const addUserToMerchant = async (req, res) => {
  try {
    const { merchantId, userId } = req.body;
    const merchant = await userClient.merchant.findUnique({
      where: {
        id: merchantId,
      },
    });

    const user = await userClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!merchant || !user) {
      res.status(404).json({ message: "merchant or User not found" });
      return;
    }
    const updatedMerchant = await userClient.merchant.update({
      where: {
        id: merchantId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "User added to merchant", data: updatedMerchant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// createProduct
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await userClient.product.create({
      data: {
        ...productData,
      },
    });
    res.status(200).json({ message: "Product Created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getAllProduct
export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await userClient.product.findMany({});
    res.status(200).json(allProduct);
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getProductById
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userClient.product.findUnique({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// updateProduct
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await userClient.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userClient.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
