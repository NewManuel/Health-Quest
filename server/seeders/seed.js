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

    // Generate questionnaires and associate them with users
    for (let i = 0; i < questionnaireSeeds.length; i++) {
      const { user: username, ...questionnaireSeed } = questionnaireSeeds[i];
      const user = createdUsers.find(user => user.username === username);

      if (user) {
        const questionnaire = await Questionnaire.create({
          ...questionnaireSeed,
          user: user._id,
        });

        user.questionnaires.push(questionnaire._id);
        await user.save();
      } else {
        console.error(`User '${username}' not found.`);
      }
    }

    console.log('Database populated successfully.');
  } catch (err) {
    console.error('Error populating database:', err);
    process.exit(1);
  }
});
