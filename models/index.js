const User = require('./User');
const Match = require('./Match');
const Group = require('./Group');

//create associations
User.hasMany(Match, {
     foreignKey: 'id'
});

User.belongsToMany(Match, {
     foreignKey: 'user_id'
});

Group.hasMany(Match, {
     foreignKey: 'id'
});

User.belongsToMany(Group, {
     through: Match,
     foreignKey: 'user_id'
});

Group.hasMany(Match, {
     foreignKey: 'group_id'
});

module.exports = { User, Group, Match };
