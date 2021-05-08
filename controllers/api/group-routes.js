const router = require("express").Router();
const { User, Match, Group } = require("../../models");
const withAuth = require("../../utils/auth");
//Need to add withAuth later

//create a group
router.post("/", (req, res) => {
  Group.create({
    group_name: req.body.group_name,
    group_email: req.body.group_email,
    group_location: req.body.group_location,
    activity_title: req.body.activity_title,
    activity_description: req.body.activity_description,
    activity_date: req.body.activity_date,
    open_slots: req.body.open_slots,
  })
    .then((dbGroupData) => res.json(dbGroupData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//read all group's info
router.get("/", (req, res) => {
  Group.findAll({
    //exclude any info?
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "email"],
    //   },
    //   {
    //     model: Match,
    //     attributes: ["mathced"],
    //   },
    // ],
  })
    .then((dbGroupData) => res.json(dbGroupData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//read 1 specific group's info
router.get("/:id", (req, res) => {
  Group.findOne({
    where: { id: req.params.id },
    // include: [
    //   {
    //     model: User,
    //     attributes: ["id", "email"],
    //   },
    //   {
    //     model: Match,
    //     attributes: ["mathced"],
    //   },
    // ],
  })
    .then((dbGroupData) => {
      if (!dbGroupData) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      res.json(dbGroupData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update and edit group
router.put("/:id", (req, res) => {
  Group.update(
      //needs review - not sure correct
    {
      group_name: req.body.group_name,
      group_email: req.body.group_email,
      group_location: req.body.group_location,
      activity_title: req.body.activity_title,
      activity_description: req.body.activity_description,
      activity_date: req.body.activity_date,
      open_slots: req.body.open_slots,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbGroupData) => {
      if (!dbGroupData) {
        res.status(404).json({ message: "Group not found" });
        return;
      }
      res.json(dbGroupData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete Group
router.delete('/:id', (req, res) => {
    Group.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbGroupData => {
        if (!dbGroupData) {
          res.status(404).json({ message: 'Group not found' });
          return;
        }
        res.json(dbGroupData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
