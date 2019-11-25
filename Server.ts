import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import dotEnv from "dotenv";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { connection } from "./database/utils";
import { verifyUser } from "./helper/context/";
// set env variables
dotEnv.config();

const app = express();

// database connect
connection();

// cors
app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: { req: any }) => {
    await verifyUser(req);
    const email = { email: req.email };
    return email;
  }
});

apolloServer.applyMiddleware({ app, path: "/graphql" });
const PORT = process.env.PORT || 3000;

app.use("/", (req, res, next) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
  console.log(`GraphQL Endpoint ${apolloServer.graphqlPath}`);
});
