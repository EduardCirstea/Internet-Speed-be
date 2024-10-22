import mongoose from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error : ${err}`);
  process.exit(1);
});
mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Connected to Mongodb.");
});

let server;
server = app.listen(PORT, () => {
  logger.info(`Server is listening at ${PORT}.`);
});

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
