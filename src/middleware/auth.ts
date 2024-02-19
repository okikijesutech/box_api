const jwt = require("jsonwebtoken");

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
    req.user = user;
    next();
  });
};

export const generateAccessToken = (user) => {
  const options = {
    expiresIn: "15m", // You can adjust the expiration time as needed
    algorithm: "HS256", // Specify the algorithm, e.g., HS256
  };
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, options);
};
