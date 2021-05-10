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
               user_id: req.session.user_id
          }
     })
     .then(userMatchData => {
          //const userData = userMatchData.get({ plain: true });
          const loggedIn = req.session.loggedIn;

          if(loggedIn) {
               res.render('dashboard', { 
                    userMatchData,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username
               });
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

               console.log('MATCHRESDATA')
               
               res.render('campfire');  
              
               
          })
          .catch(err => {
               console.log(err);
               res.status(500).json(err);
          })
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

//Render Landing Page
router.get('/', (req, res) => {
     res.render('homepage');
});
//TODO: any other pages that we need to get this rolling?

//Render Matched Page
router.get('/matched', (req, res) => {

     res.render('matched', {

     });
});

//Render My Groups Page
router.get('/created', (req, res) => {
     Campfire.findAll({
          where: {
               creating_user_id: req.session.user_id
          }
     })
     .then(campfireData => {
          res.render('created', {
               campfireData
          });
     })
     .catch(err => console.log(err));    
});

//Find a group user has not seen already
//TODO: this works for displaying random new group!
router.get('/testCampfire', (req, res) => {
     Campfire.findAll({
          order:
          Sequelize.literal('rand()'), 
          limit: 1,
          include: {
               model: Match,
               where: {
                    user_id: req.body.id,
                    matched: true,
                    matched: false
               }
          }

     })
     .then(matchResData => {
          //if match.matched = T || F where matchResData.id = match.group_id, get another campfire
          //TODO: FIGURE OUT THIS LOGIC ON MONDAY
          if (!matchResData) {
          console.log('no campfires found');
          res.status(404).json({ message: `You've visted all the campfires in your area.  Check back later for new content!` })
          return;
          }
          
          console.log('MATCHRESDATA', matchResData)
          res.render('campfire');
     })
     .catch(err => {
          console.log(err);
          res.status(500).json(err);
     })
     });

module.exports = router;

//TEST Campfire create route, api not working
router.post("/testroute", (req, res) => {
     Campfire.create({
       group_name: req.body.group_name,
       group_email: req.session.email,
       group_location: req.body.group_location,
       activity_title: req.body.activity_title,
       activity_description: req.body.activity_description,
       activity_date: req.body.activity_date,
       open_slots: req.body.open_slots,
       creating_user_id: req.session.user_id  
       //TODO: change to req.session.user_id when site is running properly
     })
       .then(dbGroupData => {
         console.log('GROUP DATA', dbGroupData);
         res.json(dbGroupData)
       })
       .catch((err) => {
         console.log(err);
         res.status(500).json(err);
       });
   });