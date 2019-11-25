import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./middleware";
import { fetchDataFromOMDb } from "../database/utils/OMDb";

export default {
  Query: {
    film: combineResolvers(
      isAuthenticated,
      async (_, { Title }: { Title: string }, { email }) => {
        console.log("===", email);
        console.log(Title);
        try {
          console.log("aca");
          const data = await fetchDataFromOMDb(Title);
          console.log(data);
          return data;
        } catch (error) {
          throw error;
        }
      }
    )
  },

  Rating: async () => {
    try {
      const data = await fetchDataFromOMDb("joker");
      return data.Ratings;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
