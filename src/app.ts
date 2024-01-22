import express from "express";
import cors from "cors";

import userRouter from "./routes/user.router";
import adminRouter from "./routes/admin.router";
import superAdminRouter from "./routes/superAdmin.router";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/merchant", adminRouter);
app.use("/admin", superAdminRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
