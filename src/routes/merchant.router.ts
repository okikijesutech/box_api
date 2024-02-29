import { Router } from "express";
import multer from "multer";

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
  tokenRefresh,
  forgotPassword,
  resetPassword,
  addUserToMerchant,
  getAllProduuctByMerchantId,
} from "../controllers/merchant.controller";
import { authenticateToken } from "../middleware/auth";

const adminRouter = Router();

const upload = multer({ dest: "uploads/" });

adminRouter.post("/", createMerchant);
adminRouter.post("/login", loginMerchant);
adminRouter.post("/refresh-token", tokenRefresh);
adminRouter.get("/", authenticateToken, getAllMerchant);
adminRouter.get("/:id", authenticateToken, getMerchantById);
adminRouter.put("/:id", authenticateToken, updateMerchant);
adminRouter.put("/add-admin", authenticateToken, addUserToMerchant);
adminRouter.delete("/:id", authenticateToken, deleteMerchant);
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
