import { Router } from "express";

import {
  createSuperAdmin,
  getAllSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
  loginSuperAdmin,
} from "../controllers/admin.controller";

const superAdminRouter = Router();

superAdminRouter.post("/", createSuperAdmin);
superAdminRouter.post("/login", loginSuperAdmin);
superAdminRouter.get("/", getAllSuperAdmin);
superAdminRouter.get("/:id", getSuperAdminById);
superAdminRouter.put("/:id", updateSuperAdmin);
superAdminRouter.delete("/:id", deleteSuperAdmin);

export default superAdminRouter;
