import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  underscored: true,
})
export default class Log extends Model<Log> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string;

  @AllowNull(true)
  @Column(DataType.TEXT('medium'))
  stack: string;

  @AllowNull(false)
  @Column(DataType.TINYINT({
    length: 1,
  }))
  type: number;

  @AllowNull(false)
  @Column(DataType.BIGINT({
    length: 13,
  }))
  time: number;
}
