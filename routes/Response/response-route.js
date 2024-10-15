// Create express application instance
const express = require("express");

// Function to create a new router object.
const router = express.Router();

// Import the response controller
const {
  addResponse,
  getResponse,
} = require("../../controller/Response/response-controller");

// POST route to create a new response
router.post("/addResponse", addResponse);

// GET route to fetch all responses
router.get("/allResponse", getResponse);

module.exports = router;
