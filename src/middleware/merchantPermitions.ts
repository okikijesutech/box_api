// export const merchantPermission = (req, res, next) => {};
// Middleware function to check if the user is logged in as a merchant
const requireMerchantLogin = async (req, res, next) => {
  try {
    // Check if there is a user session and if it's a merchant
    if (!req.user || !req.user.merchants) {
      return res
        .status(401)
        .json({ message: "Unauthorized, merchant login required" });
    }
    // If the user is logged in as a merchant, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error in requireMerchantLogin middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
