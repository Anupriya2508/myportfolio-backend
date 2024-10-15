const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  response_id: { type: String, required: true },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_message: {
    type: String,
    required: true,
  },
  responded_status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
