const router = require("express").Router();
const { User, Match, Group } = require("../../models");

//create user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email;
        req.session.location = dbUserData.location;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//TODO: untested
//user login
router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Email not found" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

//TODO: untested
//user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//reads all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//reads 1 specific user
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: { id: req.params.id },
    
    //TODO: review include:
    // include: [
    //   {
    //     model: Group,
    //     attributes: [
    //       "id",
    //       "group_name",
    //     //   "group_email",
    //       "group_location",
    //       "activity_title",
    //       "acitivty_description",
    //       "activity_date",
    //       "open_slots",
    //     ],
    //   },
    //   {
    //     model: Match,
    //     attributes: ["matched"],
    //   },
    // ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update user info
router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete user profile
router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
