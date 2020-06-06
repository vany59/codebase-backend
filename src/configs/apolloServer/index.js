import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import chalk from "chalk";

import * as resolvers from "@resolvers";
import { PORT, DOMAIN, END_POINT } from "@environments";
import { logger } from "@logger";

const server = async (app, httpServer) => {
  const allResolvers = Object.values(resolvers);
  const schema = await buildSchema({
    resolvers: [...allResolvers],
  });
  const apolloServer = new ApolloServer({
    schema,
    subscriptions: true,
    context: ({ req }) => {
      return { req };
    },
  });

  apolloServer.applyMiddleware({ app });
  httpServer.listen(PORT, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: httpServer,
        path: "/graphql",
      }
    );
    logger.info(
      `🚀 Server ready at http://${DOMAIN}:${chalk
        .hex("#bae7ff")
        .bold(PORT)}/${END_POINT}`,
      "Apollo server"
    );
    logger.info(
      `🔗 Websocket ready at ws://${DOMAIN}:${chalk
        .hex("#bae7ff")
        .bold(PORT)}/${END_POINT}`,
      "Apollo server"
    );
  });
};

export { server };
