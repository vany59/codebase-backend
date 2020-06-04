import "reflect-metadata";
import * as express from "express";
import * as http from "http";
import * as chalk from "chalk";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { getConnection } from "typeorm";

import { logger } from "@logger";
import { PORT, DOMAIN, END_POINT, RATE_LIMIT_MAX } from "@environments";
import apolloServer from "@apolloServer";
import typeormDb from "./configs/typeorm";

const main = async () => {
  try {
    //hot module
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        server.close();
        getConnection("default").close();
        server.removeAllListeners("request");
      });
    }

    const app = express();

    // added security
    app.use(helmet());

    //rateLimit
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
        message:
          "⚠️  Too many request created from this IP, please try again after an hour",
      })
    );

    const server = new http.Server(app);
    apolloServer(app);
    server.listen(PORT, () =>
      logger.info(
        `🚀 Server ready at http://${DOMAIN}:${chalk
          .hex("#bae7ff")
          .bold(PORT)}/${END_POINT}`
      )
    );

    typeormDb();
  } catch (error) {
    logger.error(`❌  Error starting server, ${error}`, "Server");
  }
};

main().catch((e) => logger.error(`❌  Error starting server, ${e}`, "Server"));
