import { Router } from "express";

import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controller";
import { authenticateToken } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", authenticateToken, getAllUser);
userRouter.get("/:id", authenticateToken, getUserById);
userRouter.put("/:id", authenticateToken, updateUser);
userRouter.delete("/:id", authenticateToken, deleteUser);

export default userRouter;
