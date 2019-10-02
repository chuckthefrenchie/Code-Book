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
    var data = req.body;
    db.User.findOne({ where: { username: data.username } })
      // eslint-disable-next-line prettier/prettier
      .then(function (user) {
        // console.log("USER PRINT", user.dataValues);
        // eslint-disable-next-line no-unused-vars
        var hashedPw = passwordHash.generate(req.body.password);
        // console.log("HASHED PW!!!", hashedPw);
        console.log("PLAIN PW!", req.body.password);
        console.log(
          "VERIFY",
          passwordHash.verify(req.body.password, user.dataValues.hash)
        );
        // eslint-disable-next-line no-empty
        if (passwordHash.verify(req.body.password, user.dataValues.hash)) {
          req.session.user = { id: user.id, username: user.username };
          // console.warn(req.session.user);
          req.session.save(function(err) {
            if (err) {
              res.status(500).send(err);
            }
            res.send({ success: true });
            // session saved
          });
          // console.log("works");
          // res.send("works!");

          // res.send(JSON.stringify({ success: true }));
          // res.send("works");
        } else {
          res.status(401).send();
        }

        // res.sendStatus(200);
      })
      .catch(function(err) {
        console.log(err);
        console.log("Combination of username and pw are not found !");
        res.sendStatus(500);
      });
  });
};
