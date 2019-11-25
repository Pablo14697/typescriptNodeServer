import { GraphQLDateTime } from "graphql-iso-date";
import userResolver from "./User";

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

export default [userResolver, customDateScalarResolver];
