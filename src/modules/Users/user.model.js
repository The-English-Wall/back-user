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
    organizationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizationTaxId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
    },
    userType: {
      type: DataTypes.ENUM("employee", "customer", "supplier"),
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "superadmin"),
      allowNull: false,
      defaultValue: "user"
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