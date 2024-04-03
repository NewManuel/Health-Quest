const db = require('../config/connection');
const { User, Questionnaire } = require('../models');
const userSeeds = require('./userSeeds.json');
const questionnaireSeeds = require('./questionnaireSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('Questionnaire', 'questionnaires');
    await cleanDB('User', 'users');

    // Create users
    const createdUsers = await User.create(userSeeds);

    for (let i = 0; i < questionnaireSeeds.length; i++) {
      const { _id, questionnaireAuthor } = await Questionnaire.create(questionnaireSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: questionnaireAuthor },
        {
          $addToSet: {
            questionnaires: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});