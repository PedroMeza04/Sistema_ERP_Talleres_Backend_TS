import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey,
} from 'sequelize-typescript';
import OrdenTrabajo from './OrdenTrabajo';
import Servicio from '../../Catalogo/model/Servicio';

@Table({ tableName: 'orden_servicio', timestamps: false })
export default class OrdenServicio extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_orden_servicio: string;

  @ForeignKey(() => OrdenTrabajo)
  @Column(DataType.UUID)
  declare id_orden: string;

  @ForeignKey(() => Servicio)
  @Column(DataType.UUID)
  declare id_servicio: string;

  @Column(DataType.STRING(200))
  declare nombre: string;

  @Column(DataType.DECIMAL(12, 2))
  declare precio: number;

  @Default(1)
  @Column(DataType.INTEGER)
  declare cantidad: number;
}
