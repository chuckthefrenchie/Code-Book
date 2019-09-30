var db = require("../models");
// hasing the pw before sending the onformation to db

var passwordHash = require("password-hash");

module.exports = function(app) {
  app.post("/api/signup", function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    var data = req.body;
    // eslint-disable-next-line camelcase
    data.hash = passwordHash.generate(req.body.password);
    db.User.create(data)
      // eslint-disable-next-line prettier/prettier
      .then(function (user) {
        res.send(user);
      })
      .catch(function(err) {
        console.log(err);
        console.log("user already exist!"); // create an alert message for the user !!!
        res.sendStatus(500);
      });
  });

  // when user hit the submit button on Login page his pw and login should be check with information in database and he/she should be redirected to the main page
  app.post("/api/login", function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
  });
};
