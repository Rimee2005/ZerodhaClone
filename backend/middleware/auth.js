const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Try multiple ways to get the token (case-insensitive)
  let token = null;
  
  // Method 1: Authorization header (most common)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // Remove "Bearer " prefix
  }
  
  // Method 2: x-auth-token header
  if (!token) {
    token = req.headers['x-auth-token'] || req.headers['X-Auth-Token'];
  }
  
  // Method 3: Query parameter or body (fallback, not recommended for production)
  if (!token) {
    token = req.query.token || req.body.token;
  }

  if (!token) {
    console.error("❌ No token provided. Headers:", Object.keys(req.headers));
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production");
    req.user = decoded; // Add decoded user info to request
    console.log("✅ Token verified for user:", decoded.userId || decoded.id || decoded.email);
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;

