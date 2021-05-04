const User = require('./User');
const Match = require('./Match');
const Group = require('./Group');

//create associations
User.hasMany(Match, {
     foreignKey: 'user_id'
});

User.belongsTo(Group, {
     foreignKey: 'user_id'
})

User.belongsToMany(Group, {
     through: Match,
     foreignKey: 'user_id'
});

Group.hasMany(Match, {
     foreignKey: 'group_id'
});