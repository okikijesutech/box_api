import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller to handle ordering an item from a merchant
export const orderItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Fetch the product details
    const product = await prisma.item.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the requested quantity is available
    if (parseInt(product.quantity) < parseInt(quantity)) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity available" });
    }

    // Calculate the total price based on the requested quantity
    const totalPrice = parseFloat(product.price) * parseInt(quantity);

    // Create a transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        productId: productId,
        quantity: quantity,
        price: totalPrice.toString(), // Convert to string to match the schema
        status: "pending", // Initial status of the transaction
      },
    });

    res.status(201).json({ message: "Order placed successfully", transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to handle updating transaction status (e.g., upon completion)
export const updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId, status } = req.body;

    // Update the transaction status
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: status,
      },
    });

    res
      .status(200)
      .json({ message: "Transaction status updated", updatedTransaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
