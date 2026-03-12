const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const claimRoutes = require("./routes/claimRoutes");
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/claims", claimRoutes);
app.use(cors());
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/policies", require("./routes/policyRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/check", (req, res) => {
  res.send("SERVER IS THIS ONE");
});

