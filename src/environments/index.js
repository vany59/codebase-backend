import * as dotenv from "dotenv";

dotenv.config();

const ENV = process.env.ENV || "development";

const PORT = process.env.PORT || "4000";

const END_POINT = process.env.END_POINT || "graphql";

const DOMAIN = process.env.DOMAIN || "localhost";

const RATE_LIMIT_MAX = +process.env.RATE_LIMIT_MAX || 10000;

// jsonwebtoken
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "access-token";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "hash";

// bcrypt
const SALT = process.env.SALT || 10;

// mail
const MAIL_USERNAME = process.env.MAIL_USERNAME || "vanyteam123@gmail.com";
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "Lev@ny963214";

// test database
const DB_USER = process.env.DB_USER || "admin";
const DB_PASS = process.env.DB_PASS || "admin123";
const DB_HOST = process.env.DB_HOST || "ds215219.mlab.com";
const DB_PORT = process.env.DB_PORT || "15219";
const DB_DATABASE = process.env.DB_DATABASE || "backend";
const DB_URL =
  process.env.DB_URL ||
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export {
  ENV,
  PORT,
  END_POINT,
  ACCESS_TOKEN,
  DOMAIN,
  RATE_LIMIT_MAX,
  ACCESS_TOKEN_SECRET,
  SALT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_URL,
};
