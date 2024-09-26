const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT;

mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

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

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
