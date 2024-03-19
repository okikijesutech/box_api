import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function setupSocket(server) {
  const io = new Server(server);

  // Handle WebSocket connections
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for messages
    socket.on("message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        // Save the message to the database
        const savedMessage = await prisma.message.create({
          data: {
            senderId,
            receiverId,
            content,
          },
        });

        // Here you can send the message to the appropriate recipient(s)
        io.emit("message", savedMessage); // Broadcast to all connected clients
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}
