import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, BelongsTo, BelongsToMany, Index,
} from 'sequelize-typescript';
import Empresa from '../../Empresas/model/Empresa';
import Servicio from './Servicio';
import ServicioRefaccion from './ServicioRefaccion';

@Table({ tableName: 'refaccion', timestamps: true })
export default class Refaccion extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_refaccion: string;

  @ForeignKey(() => Empresa)
  @Index
  @Column(DataType.UUID)
  declare id_empresa: string;

  @BelongsTo(() => Empresa)
  declare empresa?: Empresa;

  @Index
  @Column(DataType.STRING(50))
  declare sku: string;

  @Column(DataType.STRING(200))
  declare nombre: string;

  @Column(DataType.TEXT)
  declare descripcion: string;

  @Column(DataType.STRING(100))
  declare categoria: string;

  @Column(DataType.STRING(100))
  declare marca: string;

  @Column(DataType.STRING(200))
  declare proveedor_nombre: string;

  @Column(DataType.DECIMAL(10, 2))
  declare costo: number;

  @Column(DataType.DECIMAL(10, 2))
  declare precio: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare stock: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare stock_minimo: number;

  @Default('pieza')
  @Column(DataType.STRING(20))
  declare unidad: string;

  @Column(DataType.STRING(100))
  declare ubicacion: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @BelongsToMany(() => Servicio, () => ServicioRefaccion)
  declare servicios?: Servicio[];
}
