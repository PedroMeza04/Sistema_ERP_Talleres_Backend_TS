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

  @Default('fisica')
  @Column(DataType.ENUM('fisica', 'empresa'))
  declare tipo_cliente: 'fisica' | 'empresa';

  @Column(DataType.STRING(200))
  declare nombre: string;

  @Column(DataType.STRING(150))
  declare empresa_nombre: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare es_frecuente: boolean;

  @Index
  @Column(DataType.STRING(20))
  declare telefono: string;

  @Column(DataType.STRING(20))
  declare telefono2: string;

  @Column(DataType.STRING(20))
  declare whatsapp: string;

  @Column(DataType.STRING(150))
  declare email: string;

  @Column(DataType.STRING(255))
  declare direccion: string;

  @Column(DataType.STRING(100))
  declare ciudad: string;

  @Column(DataType.STRING(100))
  declare estado: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare requiere_facturacion: boolean;

  @Column(DataType.STRING(20))
  declare rfc: string;

  @Column(DataType.STRING(200))
  declare razon_social: string;

  @Column(DataType.STRING(10))
  declare regimen_fiscal: string;

  @Column(DataType.STRING(10))
  declare uso_cfdi: string;

  @Column(DataType.STRING(150))
  declare email_fiscal: string;

  @Column(DataType.STRING(10))
  declare codigo_postal_fiscal: string;

  @Column(DataType.TEXT)
  declare notas: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @HasMany(() => Vehiculo)
  declare vehiculos?: Vehiculo[];
}
