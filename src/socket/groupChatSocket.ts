import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function groupChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("joinGroupChat", async (groupId: string) => {
      socket.join(groupId);
    });

    socket.on(
      "groupMessage",
      async (data: { groupId: string; senderId: string; content: string }) => {
        const { groupId, senderId, content } = data;

        try {
          const savedMessage = await prisma.groupMessage.create({
            data: {
              groupId,
              senderId,
              content,
            },
          });
          io.to(groupId).emit("groupMessage", savedMessage);
        } catch (error) {
          console.log("Error saving group message", error);
        }
      }
    );
  });
}
