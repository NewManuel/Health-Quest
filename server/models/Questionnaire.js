const { Schema, model } = require('mongoose');

const questionnaireSchema = new Schema({
  questionnaireAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  hydration: {
    type: Number, // Assuming scores are numerical values
    required: true
  },
  nourishment: {
    type: Number,
    required: true
  },
  education: {
    type: Number,
    required: true
  },
  exercise: {
    type: Number,
    required: true
  },
  connections: {
    type: Number,
    required: true
  },
  sleep: {
    type: Number,
    required: true
  },
  gratitude: {
    type: Number,
    required: true
  },
  processedFoods: {
    type: Number,
    required: true
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Questionnaire = model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;
