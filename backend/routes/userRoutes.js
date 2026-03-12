const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ===================================================
// ✅ REGISTER (WITH PHOTO)
// ===================================================
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, mobile, location, language } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role =
      email === "medarisrinidhi@gmail.com"
        ? "admin"
        : "user";

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile: mobile.startsWith("+") ? mobile : "+91" + mobile,
      location,
      language: language || "english",
      role,
      status: "Active",
      photo: req.file.path, // ✅ store photo path
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});


// ===================================================
// ✅ LOGIN
// ===================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.status === "Blocked") {
      return res.status(403).json({ message: "Account is blocked by admin" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      language: user.language,
      mobile: user.mobile,
      photo: user.photo, // optional
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
});


// ===================================================
// ✅ GET ALL USERS (Admin)
// ===================================================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===================================================
// ✅ UPDATE USER
// ===================================================
router.put("/:id", async (req, res) => {
  try {
    const { status, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin" && status === "Blocked") {
      return res.status(403).json({ message: "Admin cannot be blocked" });
    }

    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===================================================
// ✅ CHANGE PASSWORD
// ===================================================
router.put("/change-password/:id", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ===================================================
// ✅ DELETE USER
// ===================================================
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;