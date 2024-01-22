import { Router } from "express";

import {
  createMerchant,
  getAllMerchant,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
  loginMerchant,
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/merchant.controller";

const adminRouter = Router();

adminRouter.post("/", createMerchant);
adminRouter.get("/", getAllMerchant);
adminRouter.get("/:id", getMerchantById);
adminRouter.put("/:id", updateMerchant);
adminRouter.delete("/:id", deleteMerchant);
adminRouter.post("/login", loginMerchant);
adminRouter.post("/", createProduct);
adminRouter.get("/", getAllProduct);
adminRouter.get("/:id", getProductById);
adminRouter.put("/:id", updateProduct);
adminRouter.delete("/:id", deleteProduct);

export default adminRouter;
