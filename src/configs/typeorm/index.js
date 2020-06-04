import "reflect-metadata";
import { DB_URL } from "@environments";
import { createConnection, getMetadataArgsStorage } from "typeorm";

import { logger } from "@logger";

async function connect() {
  // const config = {
  //   type: "mongodb",
  //   entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  //   synchronize: true,
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   keepConnectionAlive: true,
  //   logging: true,
  //   url: DB_URL,
  // };
  await createConnection({
    type: "mongodb",
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: true,
    url: DB_URL,
  })
    .then((connect) => {
      logger.info(`🌨️  Database connected`, "TypeORM");
    })
    .catch((e) => {
      // console.log("error");
      connect();
    });
}

export default connect;
