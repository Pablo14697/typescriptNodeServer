import { gql } from "apollo-server-express";

import userTypeDefs from "./User";

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

export default [typeDefs, userTypeDefs];
