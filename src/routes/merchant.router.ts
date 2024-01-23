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
adminRouter.post("/product", createProduct);
adminRouter.get("/product", getAllProduct);
adminRouter.get("/product/:id", getProductById);
adminRouter.put("/product/:id", updateProduct);
adminRouter.delete("/product/:id", deleteProduct);

export default adminRouter;
