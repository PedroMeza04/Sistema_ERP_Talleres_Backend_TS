import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, Index,
} from 'sequelize-typescript';
import Servicio from './Servicio';
import Refaccion from './Refaccion';

@Table({ tableName: 'servicio_refaccion', timestamps: false })
export default class ServicioRefaccion extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_servicio_refaccion: string;

  @ForeignKey(() => Servicio)
  @Index
  @Column(DataType.UUID)
  declare id_servicio: string;

  @ForeignKey(() => Refaccion)
  @Index
  @Column(DataType.UUID)
  declare id_refaccion: string;

  @Default(1)
  @Column(DataType.INTEGER)
  declare cantidad: number;
}
