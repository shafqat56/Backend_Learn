const mongoose = require("mongoose");
const fs = require("fs");
const movieschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
      minlength: [5, "Length must be equal or greater then 5"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is a required field"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is a required field"],
    },
    ratings: {
      type: Number,
    },
    totalRatings: {
      type: Number,
    },
    releaseYear: {
      type: Number,
      required: [true, "Release Year is a required field"],
    },
    releaseDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    genres: {
      type: [String],
      required: [true, "genres Year is a required field"],
    },
    directors: {
      type: [String],
      required: [true, "Directors is a required field"],
    },
    coverImage: {
      type: String,
      required: [true, "cover image is a required field"],
    },
    actors: {
      type: [String],
      required: [true, "Actors is a required field"],
    },
    price: {
      type: Number,
      required: [true, "Price is a required field"],
    },
    createdBy: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
movieschema.virtual("durationinHours").get(function () {
  return this.duration / 60;
});
// Executed Before the Document is saved in DB
// .save or .create() Method

// Document MiddleWare
movieschema.pre("save", function (next) {
  console.log(this);
  this.createdBy = "Shafqat";
  next();
});
movieschema.post("save", function (doc, next) {
  const content = `A new Document ${doc.name} is created by ${doc.createdBy}\n`;

  fs.writeFileSync("./log/Log.txt", content, { flag: "a" }, (err) => {
    console.log(err);
  });
  next();
});

// Querry MiddleWare
movieschema.pre(/^find/, function (next) {
  this.find({ releaseDate: { $lte: Date.now() } });
  this.startTime = Date.now();
  next();
});
movieschema.post(/^find/, function (docs, next) {
  // this.find({ releaseDate: { $lte: Date.now() } });
  this.endTime = Date.now();
  const content = `Querry Took ${
    this.endTime - this.startTime
  } ms to fetch the documents\n`;
  fs.writeFileSync("./log/Log.txt", content, { flag: "a" }, (err) => {
    console.log(err);
  });
  next();
});
movieschema.pre("aggregate", function (next) {
  console.log(
    this.pipeline().unshift({ $match: { releaseDate: { $lte: new Date() } } })
  );

  next();
});
const Movie = mongoose.model("Movie", movieschema);

module.exports = Movie;
