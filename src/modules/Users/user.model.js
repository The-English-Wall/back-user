import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js"
import { encryptedPassword } from "../../config/plugins/encrypted-password.js"
const User = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
    role: {
      type: DataTypes.ENUM("normal", "admin"),
      allowNull: false,
      defaultValue: "normal"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await encryptedPassword(user.password)
    },
  }
})


export default User;