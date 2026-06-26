import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey,
} from 'sequelize-typescript';
import OrdenTrabajo from './OrdenTrabajo';
import Refaccion from '../../Catalogo/model/Refaccion';

@Table({ tableName: 'orden_refaccion', timestamps: false })
export default class OrdenRefaccion extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_orden_refaccion: string;

  @ForeignKey(() => OrdenTrabajo)
  @Column(DataType.UUID)
  declare id_orden: string;

  @ForeignKey(() => Refaccion)
  @Column(DataType.UUID)
  declare id_refaccion: string;

  @Column(DataType.STRING(200))
  declare nombre: string;

  @Column(DataType.STRING(50))
  declare sku: string;

  @Column(DataType.DECIMAL(12, 2))
  declare precio: number;

  @Default(1)
  @Column(DataType.INTEGER)
  declare cantidad: number;
}
