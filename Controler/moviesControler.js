// let fs = require("fs");
const Movie = require("./../Modle/moviesModle");
// const Movie = require("./../Modle/moviesModle");
const APIFeatures = require("./../Utils/APIFeatures");
// let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

// exports.Checkid = (req, res, next, value) => {
//   console.log(`Movie ID is : ${value}`);
//   let movie = movies.find((el) => el.id === value * 1);
//   if (!movie) {
//     return res.status(404).json({
//       status: "fail",
//       message: `Movie with ID ${value} not Found`,
//     });
//   }
//   next();
// };

// exports.validateMovie = (req, res, next) => {
//   if (!req.body.name || !req.body.releaseYear) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Not a valid Movie Data",
//     });
//   }
//   next();
// };
exports.gethighestRated = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratings";
  next();
};

exports.getAllMovies = async (req, res) => {
  //Using Movies.json as a File

  // res.status(200).json({
  //   status: "success",
  //   requestedAt: req.requestedAt,
  //   count: movies.length,
  //   data: {
  //     movie: movies,
  //   },
  // });

  // Using MongoDB as a Database
  try {
    const features = new APIFeatures(Movie.find(), req.query)
      .Filter()
      .sort()
      .limitFields()
      .paginate();
    let movies = await features.query;
    // console.log(req.query);
    //exclude query Strings Logic

    // const excludequery = ["sort", "page", "limit", "fields"];
    // const queryObj = { ...req.query };
    // excludequery.forEach((el) => {
    //   delete queryObj[el];
    // });
    // console.log(queryObj);

    // // Advance Filtering like >= <=
    // // Movie.find({duration:{$gte:90},ratings:{$gte:7},price{$lte:12}}) Filter look like this
    // let querystr = JSON.stringify(queryObj);
    // querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // const filteredqueryObj = JSON.parse(querystr);
    // // console.log(queryObj);

    // let query = Movie.find(filteredqueryObj);
    // // Sorting Logic
    // if (req.query.sort) {
    //   console.log(req.query.sort);

    //   const sortBy = req.query.sort.split(",").join(" ");
    //   console.log(sortBy);

    //   query = query.sort(sortBy);
    // } else {
    //   query.sort("-createdAt");
    // }

    // Show only selective Fields

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // Pagination

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 2;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const moviesCount = await Movie.countDocuments();
    //   if (skip >= moviesCount) {
    //     throw new Error("Requested page cannot be found!");
    //   }
    // }
    // const movies = await query;
    // const movies = await Movie.find()
    //   .where("duration")
    //   .gte(req.query.duration?.gte)
    //   .where("ratings")
    //   .gte(req.query.ratings?.gte)
    //   .where("price")
    //   .lte(req.query.price?.lte);
    res.status(200).json({
      status: "success",
      count: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getMovie = async (req, res) => {
  //Using Movies.json as a File
  // const id = req.params.id * 1;
  // let movie = movies.find((el) => el.id === id);
  // if (!movie) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with ID ${id} not Found`,
  //   });
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     movie: movie,
  //   },
  // });

  // Using MongoDB as a Database
  // const movie = await Movie.find({ _id: req.params.id });

  try {
    const movie = await Movie.findById(req.params.id);
    if (movie === null) {
      return res.status(404).json({
        status: "fail",
        message: `No Movie with ID: ${req.params.id} is Present in DB`,
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.createMovie = async (req, res) => {
  //Using Movies.json as a File

  // console.log(req.body);
  // let newID = movies[movies.length - 1].id + 1;
  // let newMovie = { id: newID, ...req.body };

  // movies.push(newMovie);
  // fs.writeFile("./data/movies.json", JSON.stringify(movies), () => {
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       movie: newMovie,
  //     },
  //   });
  // });

  // Using MongoDB as a Database
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.updateMovie = async (req, res) => {
  //Using Movies.json as a File
  // const id = req.params.id * 1;
  // let movietoUpdate = movies.find((el) => el.id === id);
  // if (!movietoUpdate) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with ID ${id} not Found`,
  //   });
  // }
  // let index = movies.indexOf(movietoUpdate);
  // Object.assign(movietoUpdate, req.body);
  // movies[index] = movietoUpdate;
  // fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       movie: movietoUpdate,
  //     },
  //   });
  // });

  // Using MongoDB as a Database
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedMovie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteMovie = async (req, res) => {
  //Using Movies.json as a File
  // const id = req.params.id * 1;
  // let movietoDelete = movies.find((el) => el.id === id);
  // if (!movietoDelete) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movie with ID ${id} not Found to Delete`,
  //   });
  // }
  // let index = movies.indexOf(movietoDelete);
  // movies.splice(index, 1);
  // fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
  //   res.status(204).json({
  //     status: "success",
  //     data: {
  //       movie: null,
  //     },
  //   });
  // });
  // Using MongoDB as a Database
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getmovieStats = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      {
        $match: { ratings: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$releaseYear",
          avgRating: { $avg: "$ratings" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          totalPrice: { $sum: "$price" },
          movieCount: { $sum: 1 },
        },
      },
      {
        $sort: { minPrice: 1 },
      },
      {
        $match: { maxPrice: { $gte: 15 } },
      },
    ]);
    res.status(200).json({
      status: "success",
      count: stats.length,
      data: stats,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getmovieByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          moviesCount: { $sum: 1 },
          movies: { $push: "$name" },
        },
      },
      {
        $addFields: { genre: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
      { $sort: { moviesCount: -1 } },
      {
        $match: { genre: genre },
      },
    ]);
    res.status(200).json({
      status: "success",
      count: movies.length,
      data: movies,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
