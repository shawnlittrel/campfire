const router = require("express").Router();
const { Users, Match, Campfire } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

//Render User Dashboard - is this where we have a create groups button and see what we matched with?
//TODO: TESTED AND WORKING
router.get('/dashboard', (req, res) => {
     Match.findAll({
          where: {
               user_id: req.session.id
          }
     })
     .then(userMatchData => {
          //const userData = userMatchData.get({ plain: true });
          const loggedIn = req.session.loggedIn;

          if(loggedIn) {
               res.render('dashboard', { userMatchData });
          } else {
               res.render('login');
          }
     });
});

//Render Group Create page
//TODO: NEED CREATE-GROUP HANDLEBARS PAGE
router.get('/create-group', (req, res) => {
     if (req.session.loggedIn) {
          res.render('create-group');
     } else {
          res.render('login');
     }
});

//Render Group Edit page
//TODO: NEED EDIT-GROUP HANDLEBARS PAGE
router.get('/edit-group', (req, res) => {
     if (req.session.loggedIn) {
          res.render('edit-group');
     } else {
          res.render('login');
     }
})

//Render Match/'Campfire'/Display random groups for matching
//TODO: NEED CAMPFIRE HANDLEBARS PAGE
router.get('/campfire', (req, res) => {
     const loggedIn = req.session.loggedIn;
     if(loggedIn){
          Match.findOne({
               where: {
                    user_id: req.session.id,
                    matched: NULL
               },

               include: [
                    {
                         model: Group,
                         attributes: [
                              'group_name',
                              'group_email',
                              'group_location',
                              'activity_title',
                              'activity_description',
                              'open_slots',
                              'activity_date',
                         ],
                    },
               ]
          })
          .then(groupPostData => {
               const groupData = groupPostData.get({ plain: true });

               res.render('campfire', { groupData });  
          });
     } else {
          res.render('login');
     }
});

//Render Login page
//TODO: TESTED AND WORKING
router.get('/login', (req, res) => {
     res.render("login");
   });

//Render Register page
//TODO: NEED REGISTER HANDLEBARS PAGE
router.get('/register', (req, res) => {
     res.render("register");
   });

//TODO: any other pages that we need to get this rolling?

//test route
router.get('/test', (req, res) => {
         Campfire.findAll({
              include: [Users]
         })
     .then(dbTestData => {
       res.json(dbTestData);
     })
     });

//Find a group user has not seen already
router.get('/testCampfire', (req, res) => {
     Campfire.findAll({
          order:
          Sequelize.literal('rand()'), 
          limit: 1

     })
     .then(matchResData => {
          //if match.matched = T || F where matchResData.id = match.group_id, get another campfire
          if (!matchResData) {
          console.log('no campfires found');
          res.status(404).json({ message: 'No campfires found.' })
          return;
          }
     
          res.json(matchResData);
     })
     .catch(err => {
          console.log(err);
          res.status(500).json(err);
     })
     });

module.exports = router;