import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import session from "express-session";
import cookieparser from "cookie-parser";
import bParser from "body-parser";
import MongoDB from "connect-mongodb-session";

config();

const port: number = parseInt(process.env.PORT!);

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URL!,
  collection: "sessions",
});

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
// app.use(bParser({uriencoded:}));

app.use(
  session({
    secret: " process.env.SESSION_SECRET!",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 24 * 60,
      sameSite: "lax",
      secure: false,
    },

    store,
  })
);

mainApp(app);

const server = app.listen(port, () => {
  console.log("Server is running... 🚀");
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection:", reason);
  server.close(() => {
    process.exit(1);
  });
});
