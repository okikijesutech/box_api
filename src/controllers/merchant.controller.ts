import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcrypt");

const userClient = new PrismaClient().merchant;

// createMerchant
export const createMerchant = async (req, res) => {
  try {
    const { name, email, password, shopName, merchantType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !shopName) {
      res.status(400).json({ error: "Input your name or email" });
      return;
    }
    const merchant = await userClient.create({
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
    const merchant = await userClient.findUnique({
      where: {
        email: email,
      },
    });
    if (!merchant) res.status(400).json({ message: "Merchant doesn't exsit" });

    const passwordMatch = await bcrypt.compare(
      password,
      merchant.password || ""
    );
    if (passwordMatch) {
      res
        .status(200)
        .json({ data: merchant, message: "Merchant successfully logged in" });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal serve error" });
  }
};
// getAllMerchant
export const getAllMerchant = async (req, res) => {
  try {
    const allMerchant = await userClient.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json({ data: allMerchant });
  } catch (e) {
    console.log(e);
  }
};
// getMerchantById
export const getMerchantById = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchant = await userClient.findUnique({
      where: {
        id: merchantId,
      },
      include: {
        products: true,
      },
    });
    res.status(200).json({ data: merchant });
  } catch (e) {
    console.log(e);
  }
};
// updateMerchant
export const updateMerchant = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchantData = req.body;
    const merchant = await userClient.update({
      where: {
        id: merchantId,
      },
      data: merchantData,
    });
    res.status(200).json({ data: merchant });
  } catch (e) {
    console.log(e);
  }
};
// deleteMerchant
export const deleteMerchant = async (req, res) => {
  try {
    const merchantId = req.params.id;
    const merchant = await userClient.delete({
      where: {
        id: merchantId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
// createProduct
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const product = await userClient.create({
      data: productData,
    });
    res.status(200).json({ data: product, message: "Product Created" });
  } catch (e) {
    console.log(e);
  }
};
// getAllProduct
export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await userClient.findMany({});
    res.status(200).json({ data: allProduct });
  } catch (e) {
    console.log(e);
  }
};
// getProductById
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userClient.findUnique({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
  }
};
// updateProduct
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await userClient.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
  }
};
// deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userClient.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ data: {} });
  } catch (e) {
    console.log(e);
  }
};
