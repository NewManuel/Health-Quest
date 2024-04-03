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
  mutation addQuestionnaire($question1: Boolean!, $question2: Boolean!, $question3: Boolean!, $question4: Boolean!, $question5: Boolean!, $question6: Boolean!, $question7: Boolean!, $question8: Boolean!) {
    addQuestionnaire(question1: $question1, question2: $question2, question3: $question3, question4: $question4, question5: $question5, question6: $question6, question7: $question7, question8: $question8) {
      _id
      questionnaireAuthor
      question1
      question2
      question3
      question4
      question5
      question6
      question8
      question7
      createdAt
      updatedAt
    }
  }
`;

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
