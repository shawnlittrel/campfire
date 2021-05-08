const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const groupRoutes = require('./group-routes.js');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);

module.exports = router;