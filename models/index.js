const Users = require('./Users');
const Campfire = require('./Campfire');

//Users create the Campfires
Campfire.belongsTo(Users, {
     foreignKey: 'creating_user_id'
});

Users.hasMany(Campfire, {
     foreignKey: 'matched_groups'
});

module.exports = { Users, Campfire };
