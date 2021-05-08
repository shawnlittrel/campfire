const router = require("express").Router();
const { User, Match, Group } = require("../../models");
const withAuth = require("../../utils/auth");

//Render User Dashboard - is this where we have a create groups button and see what we matched with?

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
     if (req.session.loggedIn) {
          Group.findOne({
               where: {
                    
               }
          })
     }
})

//Render Login page
router.get("/login", (req, res) => {
     res.render("login");
   });

//Render Register page
router.get("/register", (req, res) => {
     res.render("register");
   });

//TODO: any other pages that we need to get this rolling?

module.exports = router;