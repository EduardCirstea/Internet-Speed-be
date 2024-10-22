import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import routes from "./routes/index.js";
import createHttpError from "http-errors";

dotenv.config();
const app = express();
app.use(cors());
// app.use("/api/v1", routes);
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
export default app;
