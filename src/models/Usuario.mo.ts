import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model {
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(100),
  })
  declare username: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING(100),
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(100),
  })
  declare password: string;

  @Default("user")
  @Column({
    type: DataType.ENUM("user", "admin"),
  })
  declare role: "user" | "admin";

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare isActive: boolean;
}

export default User;