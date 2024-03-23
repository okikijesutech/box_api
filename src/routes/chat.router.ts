import express from "express";
import {
  createGroupChat,
  getAllGroupChat,
  addMembersToGroupChat,
  removeMembersFromGroupChat,
  banUserFromGroupChat,
} from "../controllers/groupChat.controller";

import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// Create a new group chat
router.post("/create", authenticateToken, createGroupChat);

router.get("/", authenticateToken, getAllGroupChat);

// Add members to a group chat
router.post("/add-members", authenticateToken, addMembersToGroupChat);

// Remove members from a group chat
router.post("/remove-members", authenticateToken, removeMembersFromGroupChat);

// Ban a user from a group chat
router.post("/ban-user", authenticateToken, banUserFromGroupChat);

export default router;
