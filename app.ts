import express from "express";
import prisma from "./prisma/prisma";

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(newUser);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/quiz", async (req, res) => {
  try {
    const question = await prisma.quiz.findMany();
    res.json(question);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/quiz", async (req, res) => {
  try {
    const { name, question, options } = req.body;
    const newQuiz = await prisma.quiz.create({
      data: {
        name,
      },
    });
  } catch (error) {}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
