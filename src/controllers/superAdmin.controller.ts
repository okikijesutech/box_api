import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().admin;

// createSuperAdmin
export const createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "input name or email" });
    }

    const admin = await userClient.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(200).json({ data: admin, message: "Admin created" });
  } catch (e) {
    console.log(e);
  }
};
// getAllSuperAdmin
export const getAllSuperAdmin = async (req, res) => {
  try {
    const admin = await userClient.findMany({});
    res.status(200).json({ data: admin });
  } catch (e) {
    console.log(e);
  }
};
// getSuperAdminById
export const getSuperAdminById = async (req, res) => {
  try {
    const superAdminId = req.params.id;
    const admin = await userClient.findUnique({
      where: {
        id: superAdminId,
      },
    });
    res.status(200).json({ data: admin });
  } catch (e) {
    console.log(e);
  }
};
// updateSuperAdmin
export const updateSuperAdmin = async (req, res) => {
  try {
    const superAdminId = req.params.id;
    const superAdminData = req.body;
    const admin = await userClient.update({
      where: {
        id: superAdminId,
      },
      data: superAdminData,
    });
    res.status(200).json({ data: admin, message: "updated succesfully" });
  } catch (e) {
    console.log(e);
  }
};
// deleteSuperAdmin
export const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdminId = req.params.id;
    const admin = await userClient.delete({
      where: {
        id: superAdminId,
      },
    });
    res.status(200).json({ data: {}, message: "Account deleted" });
  } catch (e) {
    console.log(e);
  }
};
// Log in
export const loginSuperAdmin = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};
