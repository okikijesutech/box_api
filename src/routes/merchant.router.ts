import { Router } from "express";

import {
  createMerchant,
  getAllMerchant,
  getMerchantById,
  updateMerchant,
  deleteMerchant,
  forgotPassword,
  resetPassword,
  addUserToMerchant,
} from "../controllers/merchant.controller";
import { loginMerchant, tokenRefresh } from "../controllers/auth.controller";
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProduuctByMerchantId,
} from "../controllers/product.controlller";
import { authenticateToken } from "../middleware/auth";
import { requireMerchantLogin } from "../middleware/merchantPermitions";
import upload from "../middleware/imageUpload";

const adminRouter = Router();

adminRouter.post("/", createMerchant);
adminRouter.post("/login", loginMerchant);
adminRouter.post("/refresh-token", tokenRefresh);
adminRouter.get("/", authenticateToken, getAllMerchant);
adminRouter.get("/:id", authenticateToken, getMerchantById);
adminRouter.put("/:id", authenticateToken, updateMerchant);
adminRouter.post(
  "/add-admin",
  authenticateToken,
  requireMerchantLogin,
  addUserToMerchant
);
adminRouter.delete(
  "/:id",
  authenticateToken,
  requireMerchantLogin,
  deleteMerchant
);
adminRouter.get(
  "/:merchantId/product",
  authenticateToken,
  getAllProduuctByMerchantId
);
// products routes
adminRouter.post(
  "/product",
  authenticateToken,
  upload.single("image"),
  createProduct
);
adminRouter.get("/product", authenticateToken, getAllProduct);
adminRouter.get("/product/:id", authenticateToken, getProductById);
adminRouter.put("/product/:id", authenticateToken, updateProduct);
adminRouter.delete("/product/:id", authenticateToken, deleteProduct);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/reset-password", resetPassword);

export default adminRouter;
