const express = require("express");
const morgan = require("morgan");
const moviesRouter = require("./Routes/moviesRouter");

let app = express();

const logger = (req, res, next) => {
  console.log("Middleware called");
  next();
};
app.use(express.json()); //we use () becaues these are not themselves middleware func. rather they return are middleware function
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static("./public"));

app.use(logger);
app.use((req, res, next) => {
  console.log("Hi");

  req.requestedAt = new Date().toISOString();
  next();
});

// // Route = HTTP_Method + URL

// app.get("/", (req, res) => {
//   res.status(200).send("Hello from Express Server");
// });
// app.get("/api/v1/movies", getAllMovies);
// app.get("/api/v1/movies/:id", getMovie);
// app.post("/api/v1/movies", createMovie);
// app.patch("/api/v1/movies/:id", updateMovie);
// app.delete("/api/v1/movies/:id", deleteMovie);

app.use("/api/v1/movies", moviesRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `The requested URL ${req.originalUrl} cannot be found on the Server!`,
  // });
  const err = new Error(
    `The requested URL ${req.originalUrl} cannot be found on the Server!`
  );
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
// Global Error Handler

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

module.exports = app;
