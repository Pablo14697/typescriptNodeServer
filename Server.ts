import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import dotEnv from "dotenv";

// set env variables
dotEnv.config();

const app: Application = express();

// cors
app.use(cors());

// body parser middleware
app.use(express.json());

const typeDefs = gql`
  type Query {
    greetings: String
  }
`;
const resolvers = {};
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/graphql" });
const PORT = process.env.port || 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
  console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
});
