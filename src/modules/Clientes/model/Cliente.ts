import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany,
  Index
} from 'sequelize-typescript';
import Empresa from '../../Empresas/model/Empresa';
import Vehiculo from './Vehiculo';

@Table({
  tableName: 'cliente',
  timestamps: true
})
export default class Cliente extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_cliente: string;

  @ForeignKey(() => Empresa)
  @Index
  @Column(DataType.UUID)
  declare id_empresa: string;

  @BelongsTo(() => Empresa)
  declare empresa?: Empresa;

  @Column(DataType.STRING(100))
  declare nombre: string;

  @Column(DataType.STRING(100))
  declare apellido_pat: string;

  @Column(DataType.STRING(100))
  declare apellido_mat: string;

  @Index
  @Column(DataType.STRING(20))
  declare telefono: string;

  @Column(DataType.STRING(150))
  declare email: string;

  @Column(DataType.STRING(255))
  declare direccion: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @HasMany(() => Vehiculo)
  declare vehiculos?: Vehiculo[];
}
