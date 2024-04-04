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
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email, password }, context) => {
      try {
        // Get the user ID from the context
        const userId = context.user._id;
        console.log(userId);
        // Search for the user by ID
        const user = await User.findById(userId);

        // If user is not found, throw an error
        if (!user) {
          throw new Error('User not found');
        }

        // Update user data if provided
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = password;
        }
        if (username) {
          user.username = username;
        }
        // Save the updated user data
        await user.save();

        // Return the updated user
        return user;
      } catch (error) {
        throw new Error('Failed to update user');
      }
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
    addQuestionnaire: async (parent, { questionnaireAuthor, hydration, nourishment, education, exercise, connections, sleep, gratitude, processedFoods }, context) => {
      if (context.user) {
        // Create the questionnaire with the provided details
        const questionnaire = await Questionnaire.create({
          questionnaireAuthor: context.user.username,
          hydration,
          nourishment,
          education,
          exercise,
          connections,
          sleep,
          gratitude,
          processedFoods
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { questionnaires: questionnaire._id } }
        );
        // Return the created questionnaire
        return questionnaire;
      }
      throw AuthenticationError('You must be logged in to perform this action');
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
