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
import { authenticateToken } from "../middleware/auth";

const adminRouter = Router();

adminRouter.post("/", createMerchant);
adminRouter.post("/login", loginMerchant);
adminRouter.get("/", getAllMerchant);
adminRouter.get("/:id", authenticateToken, getMerchantById);
adminRouter.put("/:id", authenticateToken, updateMerchant);
adminRouter.delete("/:id", deleteMerchant);
adminRouter.post("/product", authenticateToken, createProduct);
adminRouter.get("/product", authenticateToken, getAllProduct);
adminRouter.get("/product/:id", authenticateToken, getProductById);
adminRouter.put("/product/:id", authenticateToken, updateProduct);
adminRouter.delete("/product/:id", authenticateToken, deleteProduct);

export default adminRouter;
