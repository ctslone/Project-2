var db = require("../models");
var helperFunctions = require("../routes/helperFunctions.js");
var findMovie = helperFunctions.findMovie;

module.exports = function (app) {

  // Add new movie to db
  app.post("/api/movie/add/:imdbID", function (req, res) {
    imdbID = req.params.imdbID;
    findMovie(imdbID, function (results) {
      // console.log(results);

      newMovie = {
        imdbid: results.imdbID,
        title: results.Title,
        year: results.Year,
        rated: results.Rated,
        runtime: results.Runtime,
        genre: results.Genre,
        director: results.Director,
        actors: results.Actors,
        plot: results.Plot,
        language: results.Language,
        poster: results.Poster,
        boatsValue: 1
      }

      db.moviesList.create(newMovie)
      res.send("Movie Added to db");
    });

  });

  // upBoat
  app.put("/api/movie/up-boat/:imdbID", function (req, res) {
    var imdbID = req.params.imdbID;
    // console.log(imdbID)
    db.moviesList.increment({ boatsValue: 1 }, { where: { imdbid: imdbID } }).then(function (results) {
      // console.log(results);
      res.send("Movie was upBoated by 1");
    }).catch(function (results) {
      // console.log(results);
      res.send("error during upBoat");
    });
  });

  // downBoat
  app.put("/api/movie/down-boat/:imdbID", function (req, res) {
    var imdbID = req.params.imdbID;
    // console.log(imdbID)
    db.moviesList.decrement({ boatsValue: 1 }, { where: { imdbid: imdbID } }).then(function (results) {
      // console.log(results);
      res.send("Movie was downBoated by 1");
    }).catch(function (results) {
      // console.log(results);
      res.send("error during downBoat");
    });
  });

  // movie-details
  app.get("/api/movie/:imdbID", function(req, res){
    var imdbID = req.params.imdbID;
    findMovie(imdbID, function(results){
      // console.log(results);
      res.json(results);
    });

  });

  // homepage - popular
  app.get("/api/movie-find/popular", function (req, res) {
    db.moviesList.findAll({ order: [["boatsValue", "DESC"]] }).then(function (results) {
      var responseArray = [];
      results.forEach(element => {
        responseArray.push(element.dataValues);
      });
      res.json(responseArray);
      // res.render("home");
    });
  });

  // homepage - newest
  app.get("/api/movie-find/newest", function (req, res) {
    db.moviesList.findAll({ order: [["createdAt", "DESC"]] }).then(function (results) {
      var responseArray = [];
      results.forEach(element => {
        responseArray.push(element.dataValues);
      });
      res.json(responseArray);
    });
  });

  // homepage - year
  app.get("/api/movie-find/year", function (req, res) {
    db.moviesList.findAll({ order: [["year", "DESC"]] }).then(function (results) {
      var responseArray = [];
      results.forEach(element => {
        responseArray.push(element.dataValues);
      });
      res.json(responseArray);
    });
  });

  // homepage - title
  app.get("/api/movie-find/title", function (req, res) {;
    db.moviesList.findAll({ order: [["title", "ASC"]] }).then(function (results) {
      var responseArray = [];
      results.forEach(element => {
        responseArray.push(element.dataValues);
      });
      res.json(responseArray);
    });
  });

};


