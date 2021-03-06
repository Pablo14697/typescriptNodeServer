import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    user: User!
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): Token
  }

  type Token {
    token: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
