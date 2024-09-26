const express = require("express");
const moviesController = require("./../Controler/moviesControler");

const Router = express.Router();
// Router.param("id", moviesController.Checkid);
Router.route("/highest-rated").get(
  moviesController.gethighestRated,
  moviesController.getAllMovies
);
Router.route("/movie-stats").get(moviesController.getmovieStats);
Router.route("/movie-By-genre/:genre").get(moviesController.getmovieByGenre);
Router.route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);
Router.route("/:id")
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = Router;
