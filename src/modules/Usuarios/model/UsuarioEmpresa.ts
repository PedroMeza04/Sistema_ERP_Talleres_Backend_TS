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
import Usuario from './Usuarios';
import Empresa from '../../Empresas/model/Empresa';

@Table({
  tableName: 'usuario_empresa',
  timestamps: true
})
export default class UsuarioEmpresa extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_usuario_empresa: string;

  @ForeignKey(() => Usuario)
  @Index
  @Column(DataType.UUID)
  declare id_usuario: string;

  @ForeignKey(() => Empresa)
  @Index
  @Column(DataType.UUID)
  declare id_empresa: string;

  @Column(DataType.INTEGER)
  declare rol: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;

  @BelongsTo(() => Usuario)
  declare usuario?: Usuario;

  @BelongsTo(() => Empresa)
  declare empresa?: Empresa;
}
