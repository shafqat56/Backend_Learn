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

module.exports = app;
