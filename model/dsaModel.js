const mongoose = require("mongoose");

// Define the schema
const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  questionUrl: {
    type: String,
    required: true,
    unique: true,
  },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  topicName: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
}, {
    timestamps: true
});

// Create a model based on the schema
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
