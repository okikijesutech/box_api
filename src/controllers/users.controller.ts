import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user;

// createUser
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const merchant = await userClient.create({
      data: userData,
    });
    res.status(201).json({ data: merchant });
  } catch (e) {
    console.log(e);
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
// log in
export function lgoin() {}
// getAllUser
export const getAllUser = async (req, res) => {
  try {
    const allUser = await userClient.findMany({
      include: {
        products: true,
      },
    });

    res.status(200).json({ data: allUser });
  } catch (e) {
    console.log(e);
  }
};
// getMerchantById
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userClient.findUnique({
      where: {
        id: userId,
      },
      include: {
        products: true,
      },
    });
    res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
  }
};
// access product
export function product() {}
// adding product to cart
export function cart() {}
// purchase product in cart
export function purchase() {}
// order products
export function order() {}
