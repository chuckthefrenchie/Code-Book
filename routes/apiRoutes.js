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
  }); // to close signup

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
      })
      .catch(function(err) {
        console.log(err);
        console.log("Combination of username and pw are not found !");
        res.sendStatus(500);
      });
  }); // to close login

  ///// NOTES  !!!! ////

  app.get("/api/user/notes", (req, res) => {
    var userId = req.session.user.id;

    db.User.findOne({
      where: { id: userId },
      include: [{ model: db.Note }]
    }).then(user => {
      res.json(user.Notes);
    }); // to close then
  }); // to close app.get

  // POST route for saving a new note
  app.post("/api/user/notes", function(req, res) {
    console.log(req.body);
    db.Note.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.session.user.id
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/notes/:id", function(req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });

  // PUT route for updating posts
  app.put("/api/notes", function(req, res) {
    db.Note.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbNote) {
      res.json(dbNote);
    });
  });
}; // to close the module
