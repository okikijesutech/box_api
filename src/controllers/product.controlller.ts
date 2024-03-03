import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient();

// createProduct
export const createProduct = async (req, res) => {
  try {
    const { name, desc, price, quantity, merchantId } = req.body;
    // const images = req.files;
    if (!name || !price) {
      return res.status(400).json({
        message: "Please provide all required fields and at least one image",
      });
    }
    const product = await userClient.item.create({
      data: {
        name: name,
        desc: desc,
        price: price,
        quantity: quantity,
        merchantId: "bd97b943-ea99-40ac-a916-7919bcb303ce",
        // img: images.map((image) => ({ url: image.path })),
        // merchant: { connect: { id: "bd97b943-ea99-40ac-a916-7919bcb303ce" } },
      },
    });
    res.status(200).json({ message: "Product Created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getAllProduct
export const getAllProduct = async (req, res) => {
  try {
    const products = await userClient.item.findMany();
    console.log("All products:", products);
    res.status(200).json(products);
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
//getAllProduuctByMerchantId
export const getAllProduuctByMerchantId = async (req, res) => {
  try {
    const { merchantId } = req.params;
    console.log(merchantId);
    const merchant = await userClient.merchant.findUnique({
      where: {
        id: merchantId,
      },
      include: {
        items: true,
      },
    });
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    const items = merchant.items; // Extract items from the merchant object

    console.log("Items for merchant:", items); // Log items related to the merchant
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// getProductById
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await userClient.item.findUnique({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// updateProduct
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await userClient.item.update({
      where: {
        id: productId,
      },
      data: productData,
    });
    res.status(200).json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
// deleteProduct
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await userClient.item.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ message: "product has been deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
};
