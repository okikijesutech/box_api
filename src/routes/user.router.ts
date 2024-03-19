import { Router } from "express";

import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllTransactionByUserId,
} from "../controllers/users.controller";
import {
  orderItem,
  updateTransactionStatus,
} from "../controllers/order.controller";
import { loginUser } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authenticateToken, getAllUser);
userRouter.get("/:id", authenticateToken, getUserById);
userRouter.get("/transactions", authenticateToken, getAllTransactionByUserId);
userRouter.put("/:id", authenticateToken, updateUser);
userRouter.delete("/:id", authenticateToken, deleteUser);

// order
userRouter.post("/order", authenticateToken, orderItem);
userRouter.put(
  "/transaction/:transactionId",
  authenticateToken,
  updateTransactionStatus
);

export default userRouter;
