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
    questionnaireAuthor: String
    hydration: Int
    nourishment: Int
    education: Int
    exercise: Int
    connections: Int
    sleep: Int
    gratitude: Int
    processedFoods: Int
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
    questionnaires(userId: String): [Questionnaire]
    questionnaire(questionnaireId: ID!): Questionnaire
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String): Auth
    deleteUser: User
    login(email: String!, password: String!): Auth
    addQuestionnaire(
        questionnaireAuthor: String!,
        hydration: Int!,
        nourishment: Int!,
        education: Int!,
        exercise: Int!,
        connections: Int!,
        sleep: Int!,
        gratitude: Int!,
        processedFoods: Int!
      ): Questionnaire
    removeQuestionnaire(questionnaireId: ID!): Questionnaire
  }
`;

module.exports = typeDefs;
