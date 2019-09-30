var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // console.log(req.session.userName);
    if (req.session.userName) {
      res.render("index");
    } else {
      // res.render("signup");
      res.sendFile(path.join(__dirname, "../views", "signup.html"));
    }
  });

  app.get("/login", function(req, res) {
    // If this function gets called, the user alsready has a password
    res.sendFile(path.join(__dirname, "../views", "login.html"));
  });

  app.get("/index", function(req, res) {
    // If this function gets called, the user alsready has a password
    res.sendFile(path.join(__dirname, "../views", "index.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
