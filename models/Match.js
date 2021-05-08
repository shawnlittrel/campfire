const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model {}

Match.init(
     {
          id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true
          },

          user_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'user',
                    key: 'id'
               }
          },

          group_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'group',
                    key: 'id'
               }
          },

          matched: {
               type: DataTypes.BOOLEAN
          }
     },
     {
          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'match',
     }
);

module.exports = Match;