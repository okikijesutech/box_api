import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http"; // Import http module

import userRouter from "./routes/user.router";
import merchantRouter from "./routes/merchant.router";
import superAdminRouter from "./routes/admin.router";
import setupSocket from "./socket/socket";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/merchant", merchantRouter);
app.use("/admin", superAdminRouter);

const server = http.createServer(app); // Create HTTP server
const io = setupSocket(server); // Create socket.io server

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
