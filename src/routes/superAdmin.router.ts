import { Router } from "express";

import {
  createSuperAdmin,
  getAllSuperAdmin,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
  loginSuperAdmin,
} from "../controllers/superAdmin.controller";

const superAdminRouter = Router();

superAdminRouter.post("/", createSuperAdmin);
superAdminRouter.get("/", getAllSuperAdmin);
superAdminRouter.get("/:id", getSuperAdminById);
superAdminRouter.put("/:id", updateSuperAdmin);
superAdminRouter.delete("/:id", deleteSuperAdmin);
superAdminRouter.post("/", loginSuperAdmin);

export default superAdminRouter;
