import { PrismaClient } from "@prisma/client";
import emailService from "../services/emailService";

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
// getAllMerchant
export const getAllMerchant = async (req, res) => {
  try {
    const allMerchant = await userClient.merchant.findMany({
      include: {
        items: true,
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
        items: true,
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
    const { id } = req.params; // Ensure proper destructuring here
    const { name, shopName, merchantType, accName, accNo } = req.body;

    console.log("Updating merchant with ID:", id);

    const merchant = await userClient.merchant.update({
      where: {
        id,
      },
      data: {
        name,
        shopName,
        merchantType,
        accName,
        accNo,
      },
    });
    console.log(merchant);
    res.status(200).json({ message: "Merchant Updated" });
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
    const { merchantId } = req.params.id;
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
