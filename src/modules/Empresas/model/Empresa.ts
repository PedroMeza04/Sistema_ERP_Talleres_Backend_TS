import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  Default,
  HasMany,
  Index
} from 'sequelize-typescript';
import UsuarioEmpresa from '../../Usuarios/model/UsuarioEmpresa';

@Table({
  tableName: 'empresa',
  timestamps: true
})
export default class Empresa extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_empresa: string;

  @Index
  @Column(DataType.STRING(150))
  declare nombre_empresa: string;

  @Column(DataType.STRING(20))
  declare rfc: string;

  @Column(DataType.STRING(255))
  declare direccion: string;

  @Column(DataType.STRING(100))
  declare ciudad: string;

  @Column(DataType.STRING(100))
  declare estado: string;

  @Column(DataType.STRING(20))
  declare telefono: string;

  @Column(DataType.STRING(150))
  declare email: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @HasMany(() => UsuarioEmpresa)
  declare usuarioEmpresas?: UsuarioEmpresa[];
}
