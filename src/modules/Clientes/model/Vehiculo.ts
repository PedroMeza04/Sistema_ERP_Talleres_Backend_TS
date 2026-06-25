import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  Index
} from 'sequelize-typescript';
import Cliente from './Cliente';

@Table({
  tableName: 'vehiculo',
  timestamps: true
})
export default class Vehiculo extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_vehiculo: string;

  @ForeignKey(() => Cliente)
  @Index
  @Column(DataType.UUID)
  declare id_cliente: string;

  @BelongsTo(() => Cliente)
  declare cliente?: Cliente;

  @Column(DataType.STRING(50))
  declare marca: string;

  @Column(DataType.STRING(50))
  declare modelo: string;

  @Column(DataType.INTEGER)
  declare anio: number;

  @Index
  @Column(DataType.STRING(20))
  declare placa: string;

  @Column(DataType.STRING(50))
  declare color: string;

  @Column(DataType.STRING(50))
  declare numero_serie: string;

  @Column(DataType.STRING(20))
  declare kilometraje: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;
}
