import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import * as resolvers from "@resolvers";

const server = async (app) => {
  const allResolvers = Object.values(resolvers);
  const schema = await buildSchema({
    resolvers: [...allResolvers],
    authChecker: ({ context }) => {
      console.log(context.req);
      return false;
    },
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => req,
  });
  apolloServer.applyMiddleware({ app });
};

export default server;
