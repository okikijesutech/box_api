import express from "express";
import cors from "cors";

import userRouter from "./routes/user.router";
import adminRouter from "./routes/merchant.router";
import superAdminRouter from "./routes/admin.router";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173/",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/merchant", adminRouter);
app.use("/admin", superAdminRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
