// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from "../models/user.js"; // Ensure this path is correct

const JWT_SECRET = process.env.JWT_SECRET;

// Protect route middleware (used for protected routes like logout)
export const protect = async (req, res, next) => {
  let token;
  

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer token"
    console.log("Token found in header", token);

    if (!token) {
      return res.status(401).json({ message: "no token" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
      }
      // cosole.log("Decoded token", decoded.userId);

      const user = await User.findById(decoded.id);
      if(!user){
        return res.status(401).json({ message: "Not authorized user, invalid token" });
      }
      req.user = user;
      // req.user = decoded; // Attach user information to request
      next();
    } catch (err) {
      res.status(401).json({ message:  "catch :Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
