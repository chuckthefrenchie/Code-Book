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

  app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });

  app.get("/index", function(req, res) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    req.session.reload(function(err) {
      if (err) {
        console.error(err);
      }
      // session updated
      console.info(req.session.user);
      if (req.session.user) {
        // If this function gets called, the user alsready has a password
        res.sendFile(path.join(__dirname, "../views", "index.html"));
      } else {
        res.status(401).send();
      }
    });
  });

  app.get("/snippet", function(req, res) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    req.session.reload(function(err) {
      if (err) {
        console.error(err);
      }
      // session updated
      console.info(req.session.user);
      if (req.session.user) {
        // If this function gets called, the user alsready has a password
        res.sendFile(path.join(__dirname, "../views", "snippet.html"));
      } else {
        res.status(401).send();
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
