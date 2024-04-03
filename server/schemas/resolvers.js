const { User, Thought } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("thoughts");
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
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
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
