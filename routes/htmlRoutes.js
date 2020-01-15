var db = require("../models");
var helperFunctions = require("../routes/helperFunctions.js")
var searchMovie = helperFunctions.searchMovie;
var checkDbMovie = helperFunctions.checkDbMovie;


module.exports = function (app) {

  // Load the home page that displays all reviews in descending order
  app.get("/", function(req, res) {
      res.render("home");
  });

  // Movie Search Page
  app.get("/movie/search/", function (req, res) {
    res.render("movieSearch")
  });

  // Movie Results Page
  app.get("/movie/search/:name", function (req, res) {
    movieName = req.params.name;
    searchMovie(movieName, function (movieResults) {
      checkDbMovie(movieResults, function(checkedResults){
        res.render("movieResults", { results: checkedResults });
      })
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
