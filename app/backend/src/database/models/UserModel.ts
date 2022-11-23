import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(30),
  },
  role: {
    allowNull: false,
    type: STRING(30),
  },
  email: {
    allowNull: false,
    type: STRING(30),
  },
  password: {
    allowNull: false,
    type: STRING(30),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  freezeTableName: true,
  timestamps: false,
});

export default UserModel;
