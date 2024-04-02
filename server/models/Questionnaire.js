const { Schema, model } = require('mongoose');
const { Questionnaire } = require('.');

const questionnaireSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Boolean fields for each question in the questionnaire
  question1: {
    type: Boolean,
    required: true
  },
  question2: {
    type: Boolean,
    required: true
  },
  question3: {
    type: Boolean,
    required: true
  },
  question4: {
    type: Boolean,
    required: true
  },
  question5: {
    type: Boolean,
    required: true
  },
  question6: {
    type: Boolean,
    required: true
  },
  question7: {
    type: Boolean,
    required: true
  },
  question8: {
    type: Boolean,
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
