import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient();

// get all transaction
export const getAllTransaction = async (req, res) => {
  try {
    const transactions = await userClient.transaction.findMany();
    res
      .status(200)
      .json(transactions, { message: "This is all the transaction" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get transaction by id
export const getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await userClient.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
