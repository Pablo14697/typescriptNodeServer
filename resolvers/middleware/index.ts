import { skip } from "graphql-resolvers";

export const isAuthenticated = (
  _: any,
  __: any,
  { email }: { email: string }
) => {
  if (!email) {
    throw new Error("Access denied! Please login to continue");
  }
  return skip;
};
