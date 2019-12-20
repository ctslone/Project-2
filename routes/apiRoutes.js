var db = require("../models");
var helperFunctions = require("../routes/helperFunctions.js");
var findMovie = helperFunctions.findMovie;

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Add new movie to db
  app.post("/api/movie/add/:imdbId", function(req, res){
    imdbId = req.params.imdbId;
    console.log("server" + imdbId)
    findMovie(imdbId, function(results){
      console.log(results);
      res.send("Movie Added to db")
    });

  });

};
