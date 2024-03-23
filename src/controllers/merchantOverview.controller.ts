import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller to get the number of products sold over time
export const getProductsSoldOverTime = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const productsSold = await prisma.transaction.findMany({
      where: {
        product: {
          merchantId: merchantId,
        },
      },
      groupBy: {
        createdAt: {
          month: true,
        },
      },
      select: {
        // createdAt: {
        //   month: true,
        // },
        // count: {
        //   _count: true,
        // },
      },
    });

    res.status(200).json(productsSold);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// sales performance data
export const getSalesPerformanceData = async (req, res) => {
  try {
    const merchantId = req.params.merchantId; // Assuming you pass the merchantId in the request parameters

    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        product: {
          merchantId: merchantId,
        },
      },
      _sum: { price: true },
    });

    // Calculate profit margins (You need to replace 'productionCosts' with the actual cost field)
    const profitMargins = await prisma.transaction.aggregate({
      where: {
        product: {
          merchantId: merchantId,
        },
      },
      _sum: { price: true },
    });
    // Assuming productionCosts is the cost field in the Item model
    // const profitMargins = await prisma.transaction.aggregate({
    //   _sum: { price: true, item: { select: { productionCosts: true } } },
    // });

    // Sales growth analysis (You need to replace 'createdAt' with the actual date field)
    const salesGrowth = await prisma.transaction.groupBy({
      by: [{ createdAt: "day" }],
      _count: { id: true },
    });

    // Average order value
    const averageOrderValue = await prisma.transaction.aggregate({
      _avg: { price: true },
    });

    res.status(200).json({
      totalRevenue: totalRevenue._sum.price,
      profitMargins: profitMargins._sum.price,
      salesGrowth,
      averageOrderValue: averageOrderValue._avg.price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// customer data
export const getCustomerData = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    // Retrieve demographic information
    const demographicInfo = await prisma.user.findMany({
      where: {
        merchants: {
          some: {
            id: merchantId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true /* Add other demographic fields */,
      },
    });

    // Retrieve purchase history
    const purchaseHistory = await prisma.transaction.findMany({
      where: {
        user: {
          merchants: {
            some: {
              id: merchantId,
            },
          },
        },
      },
      include: { user: true, product: true },
    });

    res.status(200).json({ demographicInfo, purchaseHistory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// marketing and sales data
export const getMarketingSalesData = async (req, res) => {
  try {
    // Marketing channel tracking and conversion rates
    // Add your implementation here based on your tracking mechanisms

    // Campaign performance analysis
    // Add your implementation here based on your campaign data

    res.status(200).json({ message: "Marketing and sales data retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//operational data
export const getOperationalData = async (req, res) => {
  try {
    // Inventory management
    // Add your implementation here based on your inventory data

    // Production costs monitoring
    // Add your implementation here based on your production data

    // Customer service metrics
    // Add your implementation here based on your customer service data

    res.status(200).json({ message: "Operational data retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// market data
export const getMarketData = async (req, res) => {
  try {
    // Competitor analysis
    // Add your implementation here based on your competitor data

    // Market insights
    // Add your implementation here based on your market data

    res.status(200).json({ message: "Market data retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
