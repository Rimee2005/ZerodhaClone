const router = require("express").Router();
const User = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs"); // ✅ same as in register route


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
  console.log("👉 Plain password to hash:", plainPassword);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log("👉 Hashed password:", hashedPassword);

  // Save the user to the database
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, // Save the hashed password
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  // Validate login input
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // ✅ Extract email and password from request
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare passwords using bcrypt
  const isPasswordCorrect = await bcrypt.compare(password.trim(), user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Success
  res.status(200).json({ message: "Login successful", user });
});


module.exports = router;
