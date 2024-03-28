import {Sequelize} from "sequelize"
import db from "../config/Database.js";
import User from "./UserModels.js";

const {DataTypes} = Sequelize;

const Keterangan = db.define(
  "Keterangan",
  {
    id_ket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jam: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterangan : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Keterangan);
Keterangan.belongsTo(User, {foreignKey : "id_user"})

export default Keterangan;
