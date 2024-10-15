const ResponseModel = require("../../model/Response/response-model");

// Add a new response
const addResponse = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, email, message } = req.body;

    // Validate request body
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate unique response ID
    const id = `Response-${Date.now().toString(36)}${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Create a new response document
    const newResponse = new ResponseModel({
      response_id: id,
      user_name: name,
      user_email: email,
      user_message: message,
      responded_status: false,
    });

    console.log("New Response:", newResponse);

    // Save the response to the database
    await newResponse.save();
    console.log("Response saved");

    res.status(201).json(newResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Retrieve all responses
const getResponse = async (req, res) => {
  try {
    const allResponses = await ResponseModel.aggregate([
      {
        $project: {
          _id: 0,
          response_id: 1,
          user_name: 1,
          user_email: 1,
          user_message: 1,
          responded_status: 1,
        },
      },
    ]);

    res.status(200).json(allResponses);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addResponse, getResponse };
