import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a group chat
export const createGroupChat = async (req, res) => {
  try {
    const { name, memberIds } = req.body;

    const uniqueMemberIds: string[] = Array.isArray(memberIds)
      ? memberIds.map(String)
      : [];

    const groupChat = await prisma.groupChat.create({
      data: {
        name,
        members: {
          connect: uniqueMemberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });

    res.status(201).json(groupChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get the list of the available group chat or community
export const getAllGroupChat = async (req, res) => {
  try {
    const communities = await prisma.groupChat.findMany;
    res.status(201).json(communities, { message: "these are the communities" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Add members to a group chat
export const addMembersToGroupChat = async (req, res) => {
  try {
    const { groupId, memberIds } = req.body;
    const uniqueMemberIds: string[] = Array.isArray(memberIds)
      ? memberIds.map(String)
      : [];

    const updatedGroupChat = await prisma.groupChat.update({
      where: { id: groupId },
      data: {
        members: {
          connect: uniqueMemberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove members from a group chat
export const removeMembersFromGroupChat = async (req, res) => {
  try {
    const { groupId, memberIds } = req.body;

    const updatedGroupChat = await prisma.groupChat.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: memberIds.map((id) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Ban a user from a group chat
export const banUserFromGroupChat = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const updatedGroupChat = await prisma.groupChat.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: [{ id: userId }],
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
