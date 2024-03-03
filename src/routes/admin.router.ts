import { Router } from "express";

import {
  createSuperAdmin,
  getAllSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
} from "../controllers/admin.controller";
import { loginSuperAdmin } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth";

const superAdminRouter = Router();

superAdminRouter.post("/", createSuperAdmin);
superAdminRouter.post("/login", loginSuperAdmin);
superAdminRouter.get("/", authenticateToken, getAllSuperAdmin);
superAdminRouter.get("/:id", authenticateToken, getSuperAdminById);
superAdminRouter.put("/:id", authenticateToken, updateSuperAdmin);
superAdminRouter.delete("/:id", authenticateToken, deleteSuperAdmin);

export default superAdminRouter;
