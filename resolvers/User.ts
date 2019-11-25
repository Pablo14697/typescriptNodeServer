import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { users } from "../constants";
import { isAuthenticated } from "./middleware";
import User from "../database/models/User";

export default {
  Query: {
    users: () => {
      return users;
    },
    user: combineResolvers(
      isAuthenticated,
      (_: any, { id }: { id: any }, { email }: { email: any }) => {
        console.log("===", email);

        return users.find(user => user.id === id);
      }
    )
  },
  Mutation: {
    login: async (_: any, { input }: { input: any }) => {
      try {
        const user: any = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isPassword = await bcrypt.compare(input.password, user.password);
        if (!isPassword) {
          throw new Error("Invalid password");
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecret";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d"
        });

        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    signup: async (_: any, { input }: { input: any }) => {
      console.log("aca paso");
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("User already in use");
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  User: {
    users: ({ id }: { id: any }) => users.filter((user: any) => user.id === id)
  }
};
