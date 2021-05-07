const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create User Model

class User extends Model{
     //check password for login
     checkPassword(loginPw) {
          return bcrypt.compareSync(loginPw, this.password);
     }
}

//Define tables
User.init(
     {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true
          },

          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },

          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
               validate: {
                    isEmail: true
               }
          },

          password: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    len: [4]
               }
          },

          location: {
               type: DataTypes.INTEGER,
               allowNull: false,
               validate: {
                    len: [5]
               }
          }
          
     },
     {
          hooks: {
               //hash password
               async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
               },

               //hash password on user update password
               async beforeUpdate(updatedUserData) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
               }
          },

          sequelize,
          timestamps: false,
          freezeTableName: true,
          underscored: true,
          modelName: 'user'
     }
);

module.exports = User;