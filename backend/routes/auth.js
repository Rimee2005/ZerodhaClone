const router = require("express").Router();
const User = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");


// Register Route
router.post("/register", async (req, res) => {
  console.log("Incoming register request:", req.body);

  // Validate input
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash the password
  const plainPassword = req.body.password.trim();
  console.log("👉 Plain password to hash:", `"${plainPassword}"`);
  console.log("👉 Plain password length:", plainPassword.length);
  console.log("👉 Email:", req.body.email);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log("✅ Password hashed successfully");
  console.log("👉 Hash preview:", hashedPassword.substring(0, 20) + "...");

  // Save the user to the database
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, // Save the hashed password
  });

  try {
    console.log("💾 Hash before save:", hashedPassword.substring(0, 30) + "...");
    const savedUser = await user.save();
    
    console.log("💾 Hash after save:", savedUser.password ? savedUser.password.substring(0, 30) + "..." : "null");
    console.log("💾 Hashes match?", hashedPassword === savedUser.password);
    
    // Verify the hash was saved correctly by testing it
    const testCompare = await bcrypt.compare(plainPassword, savedUser.password);
    console.log("🔍 Verification: Can we compare the saved hash?", testCompare);
    
    // Also test with the original hash we created
    const testCompareOriginal = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("🔍 Verification: Can we compare with original hash?", testCompareOriginal);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id,
        email: savedUser.email,
        username: savedUser.username
      },
      process.env.JWT_SECRET || "your-secret-key-change-in-production",
      { expiresIn: "7d" }
    );
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(400).send(err);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  // Validate login input
  const { error } = loginValidation(req.body);
  if (error) {
    console.log("❌ Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message, details: error.details });
  }

  // ✅ Extract email and password from request
  const { email, password } = req.body;
  const trimmedPassword = password.trim();

  console.log("🔐 Login attempt for email:", email);
  console.log("🔐 Password length:", trimmedPassword.length);

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found for email:", email);
    return res.status(404).json({ message: "User not found" });
  }

  console.log("✅ User found:", user.email);
  console.log("🔐 Stored password hash exists:", !!user.password);
  console.log("🔐 Login password:", `"${trimmedPassword}"`);
  console.log("🔐 Login password length:", trimmedPassword.length);
  console.log("🔐 Stored hash length:", user.password ? user.password.length : 0);
  console.log("🔐 Stored hash preview:", user.password ? user.password.substring(0, 30) + "..." : "null");
  console.log("🔐 Stored hash starts with $2:", user.password ? user.password.startsWith('$2') : false);

  // Verify the hash format is correct (bcrypt hashes start with $2a$, $2b$, or $2y$)
  if (user.password && !user.password.startsWith('$2')) {
    console.log("⚠️ WARNING: Password hash doesn't look like a valid bcrypt hash!");
    return res.status(500).json({ message: "Database error: Invalid password format" });
  }

  // Compare passwords using bcrypt
  let isPasswordCorrect = await bcrypt.compare(trimmedPassword, user.password);
  console.log("🔐 First comparison (trimmed):", isPasswordCorrect);
  
  // Fallback: try with original password (in case user signed up without trimming)
  if (!isPasswordCorrect && password !== trimmedPassword) {
    console.log("🔐 Trying with original password (no trim)");
    isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("🔐 Second comparison (original):", isPasswordCorrect);
  }
  
  // Additional debug: try comparing with the exact string from registration
  if (!isPasswordCorrect) {
    console.log("🔐 Testing direct hash generation...");
    const testHash = await bcrypt.hash(trimmedPassword, 10);
    const testCompare = await bcrypt.compare(trimmedPassword, testHash);
    console.log("🔐 Test hash comparison works:", testCompare);
  }
  
  console.log("🔐 Final password comparison result:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    console.log("❌ Password mismatch for user:", email);
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      username: user.username
    },
    process.env.JWT_SECRET || "your-secret-key-change-in-production",
    { expiresIn: "7d" }
  );

  // Success
  console.log("✅ Login successful for user:", email);
  res.status(200).json({ 
    message: "Login successful", 
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});

// Verify Token Route
router.get("/verify", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Token is valid",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
