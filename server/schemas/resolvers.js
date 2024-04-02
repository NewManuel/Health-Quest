const { User, Questionnaire } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('questionnaires');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('questionnaires');
    },
    questionnaires: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Questionnaire.find(params).sort({ createdAt: -1 });
    },
    questionnaire: async (parent, { questionnaireId }) => {
      return Questionnaire.findOne({ _id: questionnaireId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('questionnaires');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addQuestionnaire: async (parent, { input }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to add a questionnaire.');
      }

      // Destructure input object to extract questionnaire details
      const { question1, question2, question3, question4, question5, question6, question7, question8 } = input;

      try {
        // Create the questionnaire with the provided details
        const questionnaire = await Questionnaire.create({
          user: context.user._id,
          question1,
          question2,
          question3,
          question4,
          question5,
          question6,
          question7,
          question8,
        });

        // Return the created questionnaire
        return questionnaire;
      } catch (error) {
        // Throw an error if questionnaire creation fails
        throw new Error('Failed to add questionnaire. Please try again later.');
      }
    },
    removeQuestionnaire: async (parent, { questionnaireId }, context) => {
      if (context.user) {
        const questionnaire = await Questionnaire.findOneAndDelete({
          _id: questionnaireId,
          questionnaireAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { questionnaires: questionnaire._id } }
        );

        return questionnaire;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
