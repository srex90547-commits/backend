require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Contact = require("./models/Contact");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// POST API (THIS MATCHES YOUR HTML)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.json({ message: "Message saved successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));