import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, BelongsTo, BelongsToMany, Index,
} from 'sequelize-typescript';
import Empresa from '../../Empresas/model/Empresa';
import Refaccion from './Refaccion';
import ServicioRefaccion from './ServicioRefaccion';

@Table({ tableName: 'servicio', timestamps: true })
export default class Servicio extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_servicio: string;

  @ForeignKey(() => Empresa)
  @Index
  @Column(DataType.UUID)
  declare id_empresa: string;

  @BelongsTo(() => Empresa)
  declare empresa?: Empresa;

  @Column(DataType.STRING(200))
  declare nombre: string;

  @Column(DataType.STRING(100))
  declare categoria: string;

  @Column(DataType.TEXT)
  declare descripcion: string;

  @Column(DataType.DECIMAL(10, 2))
  declare precio_base: number;

  @Column(DataType.DECIMAL(5, 2))
  declare horas_estimadas: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @Column(DataType.TEXT)
  declare notas: string;

  @BelongsToMany(() => Refaccion, () => ServicioRefaccion)
  declare refacciones?: (Refaccion & { ServicioRefaccion: ServicioRefaccion })[];
}
