import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_QUESTIONNAIRE = gql`
  mutation addQuestionnaire($questionnaireAuthor: String!, $hydration: Int!, $nourishment: Int!, $education: Int!, $exercise: Int!, $connections: Int!, $sleep: Int!, $gratitude: Int!, $processedFoods: Int!) {
    addQuestionnaire(questionnaireAuthor: $questionnaireAuthor, hydration: $hydration, nourishment: $nourishment, education: $education, exercise: $exercise, connections: $connections, sleep: $sleep, gratitude: $gratitude, processedFoods: $processedFoods) {
      _id
      questionnaireAuthor
      hydration
      education
      nourishment
      exercise
      connections
      sleep
      gratitude
      processedFoods
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      _id
      username
      email
    }
}`

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
