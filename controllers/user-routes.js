const router = require("express").Router();
const { User, Match, Group } = require("../../models");
const withAuth = require("../../utils/auth");

//Render User Dashboard - is this where we have a create groups button and see what we matched with?
router.get('/dashboard', (req, res) => {
     Match.findAll({
          where: {
               user_id: req.session.id
          }
     })
     .then(userMatchData => {
          const userData = userMatchData.get({ plain: true });
          const loggedIn = req.session.loggedIn;

          if(loggedIn) {
               res.render('dashboard', { userData });
          } else {
               res.render('login');
          }
     });
});

//Render Group Create page
router.get('/create-group', (req, res) => {
     if (req.session.loggedIn) {
          res.render('create-group');
     } else {
          res.render('login');
     }
});

//Render Group Edit page
router.get('/edit-group', (req, res) => {
     if (req.session.loggedIn) {
          res.render('edit-group');
     } else {
          res.render('login');
     }
})

//Render Match/'Campfire'/Display random groups for matching
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
router.get('/login', (req, res) => {
     res.render("login");
   });

//Render Register page
router.get('/register', (req, res) => {
     res.render("register");
   });

//TODO: any other pages that we need to get this rolling?

module.exports = router;