import express from "express";
import { ApolloServer } from "apollo-server-express";

import datasource from "./graphQLModules/datasource";
import dataloaders from "./graphQLModules/dataloaders";
import { typeDefs, resolvers } from "./graphQLModules";
import formatError from "./graphQLModules/helpers/formatError";

const PORT = 4001;

const context = {
  dataloaders,
  datasource,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at: http://localhost:${PORT}${server.graphqlPath}`);
});
