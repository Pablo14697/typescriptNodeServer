import { gql } from "apollo-server-express";

import userTypeDefs from "./User";
import filmTypeDefs from "./Film";

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

export default [typeDefs, userTypeDefs, filmTypeDefs];
