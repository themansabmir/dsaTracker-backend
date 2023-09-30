const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, query, or cookies
  const token = req.header("token");
  // Check if a token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, token not provided" });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your secret key

    // Attach the user's ID from the token to the request object
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
