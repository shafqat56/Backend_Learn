const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaughtException occured shutting down...");

  process.exit(1);
});
const app = require("./app");
const port = process.env.PORT;

mongoose.connect(process.env.CONN_STR).then(() => {
  console.log("DB Connected Successfully");
});
// .catch((error) => {
//   console.error("Error connecting to the database:", error);
// });

// const testMovie = new Movie({
//   name: "Krish ",
//   description: "A very funny Movie",
//   duration: 150
// });

// testMovie
//   .save()
//   .then((doc) => {
//     console.log("Document inserted:", doc);
//   })
//   .catch((err) => {
//     console.error("Error inserting document:", err);
//   });

const server = app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection occured shutting down...");

  server.close(() => {
    process.exit(1);
  });
});

