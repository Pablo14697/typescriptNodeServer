import { GraphQLDateTime } from "graphql-iso-date";
import userResolver from "./User";
import filmResolver from "./Film";

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

export default [userResolver, filmResolver, customDateScalarResolver];
