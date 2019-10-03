/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(140),
      unique: true
    },
    hash: DataTypes.CHAR(64),

    note: {
      type: DataTypes.STRING(3000),  
    }


    // salt: DataTypes.CHAR(10)
  });
  return User;
};
