const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    questionnaires: [Questionnaire]!
  }

  type Questionnaire {
    _id: ID
    user: User!
    question1: Boolean
    question2: Boolean
    question3: Boolean
    question4: Boolean
    question5: Boolean
    question6: Boolean
    question7: Boolean
    question8: Boolean
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    questionnaires(username: String): [Questionnaire]
    questionnaire(questionnaireId: ID!): Questionnaire
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestionnaire(questionnaireText: String!): Questionnaire
    addComment(questionnaireId: ID!, commentText: String!): Questionnaire
    removeQuestionnaire(questionnaireId: ID!): Questionnaire
    removeComment(questionnaireId: ID!, commentId: ID!): Questionnaire
  }
`;

module.exports = typeDefs;
