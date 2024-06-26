const { User, Questionnaire } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-errors");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("questionnaires");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("questionnaires");
    },
    questionnaires: async (parent, { userId }) => {
      console.log("User ID:", userId); // Log the user ID parameter
      try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Retrieve the questionnaire IDs associated with the user
        const questionnaireIds = user.questionnaires;

        // Fetch the questionnaires based on their IDs
        const questionnaires = await Promise.all(
          questionnaireIds.map(async (questionnaireId) => {
            const questionnaire = await Questionnaire.findById(questionnaireId);
            return questionnaire;
          })
        );

        // Sort the questionnaires by createdAt
        const sortedQuestionnaires = questionnaires.sort(
          (a, b) => b.createdAt - a.createdAt
        );

        return sortedQuestionnaires;
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
        throw new Error("Failed to fetch questionnaires.");
      }
    },

    questionnaire: async (parent, { questionnaireId }) => {
      return Questionnaire.findOne({ _id: questionnaireId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "questionnaires"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { username, email }, context) => {
      try {
        // Get the user ID from the context
        const userId = context.user._id;
        console.log(userId);
        // Search for the user by ID
        const user = await User.findById(userId);

        // If user is not found, throw an error
        if (!user) {
          throw new Error("User not found");
        }

        // Update user data if provided
        if (email) {
          user.email = email;
        }

        if (username) {
          user.username = username;
        }
        // Save the updated user data
        await user.save();
        const newToken = signToken({
          email: user.email,
          username: user.username,
          _id: user._id,
        });
        // Return the updated user
        return { user, token: newToken };
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },
    deleteUser: async (_, args, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        // Get the user's ID from the context
        const userId = context.user._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // If user doesn't exist, throw an error
        if (!user) {
          throw new Error('User not found');
        }

        // Get IDs of all questionnaires associated with the user
        const questionnaireIds = user.questionnaires;

        // Delete all questionnaires associated with the user
        await Questionnaire.deleteMany({ _id: { $in: questionnaireIds } });

        // Remove the user from the database
        await User.deleteOne({ _id: userId });


        // Return the deleted user
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete user');
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
    addQuestionnaire: async (
      parent,
      {
        questionnaireAuthor,
        hydration,
        nourishment,
        education,
        exercise,
        connections,
        sleep,
        gratitude,
        processedFoods,
      },
      context
    ) => {
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
          processedFoods,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { questionnaires: questionnaire._id } }
        );
        // Return the created questionnaire
        return questionnaire;
      }
      throw AuthenticationError("You must be logged in to perform this action");
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
  }
};

module.exports = resolvers;
