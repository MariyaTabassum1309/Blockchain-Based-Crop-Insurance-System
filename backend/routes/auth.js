const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { sendEmail } = require("../utils/email");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create user in DB
    const newUser = await User.create({ name, email, password });

    // Send welcome email
    const html = `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for registering with Smart Agri Insurance.</p>
      <p>You can now log in and create your first policy.</p>
    `;
    await sendEmail(email, "Welcome to Smart Agri Insurance", html);

    res.status(201).json({ message: "User registered and email sent", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
