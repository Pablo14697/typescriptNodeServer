import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    film(Title: String!): Film!
  }

  type Film {
    Title: String!
    Year: String!
    Director: String!
    Writer: Date!
    Ratings: [Rating!]
  }

  type Rating {
    Source: String!
    Value: String!
  }
`;
