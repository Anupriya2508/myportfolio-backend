const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1); // Exit if unable to connect
  }
};

// Call the function to connect to MongoDB
connectDB();

// Import and use the response routes
const responseRoutes = require("./routes/Response/response-route");
app.use("/", responseRoutes); // Use the response routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
