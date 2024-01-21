import express from "express";

import userRouter from "./routes/user.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
