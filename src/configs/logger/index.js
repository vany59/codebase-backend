import winston, { format } from "winston";
import * as chalk from "chalk";
import { ENV } from "@environments";

let logger = null;
if (ENV !== "production") {
  logger = new winston.createLogger({
    level: "debug",
    format: format.combine(
      format.timestamp({ format: "DD/MM/YY, HH:mm:ss" }),
      format.printf((info) => {
        const { level, message, timestamp } = info;
        const args = info[Symbol.for("splat")] || "";
        let messageShow = message;
        switch (level) {
          case "info":
            messageShow = chalk.green(message);
            break;
          case "error":
            messageShow = chalk.red(message);
            break;
          case "warning":
            messageShow = chalk.yellow(message);
            break;
        }
        const showout = `${
          level !== "error"
            ? chalk.bgGreen.bold("Server")
            : chalk.bgRed.bold("Server")
        } - ${timestamp} ${chalk.cyan(">>")} ${chalk.yellow(
          args ? `[${args}]` : `[${level}]`
        )} ${messageShow}`;
        return showout;
      })
    ),
    transports: [new winston.transports.Console()],
  });
} else {
  logger = new winston.createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({ format: "DD/MM/YY, HH:mm:ss" }),
      format.printf((info) => {
        const { timestamp, message } = info;
        return `${timestamp}  -  ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
    ],
  });
}

export { logger };
