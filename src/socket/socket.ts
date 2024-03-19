import { Server } from "socket.io";

export default function setupSocket(server) {
  const io = new Server(server);

  // Handle WebSocket connections
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for messages
    socket.on("message", (data) => {
      const { sender, receiver, message } = data;
      // Here you can handle the message, maybe store it in a database,
      // and send it to the appropriate recipient(s)
      // Example: send the message to the receiver
      io.to(receiver).emit("message", { sender, message });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}
