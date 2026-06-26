import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import CuentaPorCobrar from './CuentaPorCobrar';

export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta' | 'cheque' | 'otro';

@Table({ tableName: 'pago_cuenta_por_cobrar', timestamps: true })
export default class PagoCuentaPorCobrar extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_pago: string;

  @ForeignKey(() => CuentaPorCobrar)
  @Column(DataType.UUID)
  declare id_cuenta: string;

  @BelongsTo(() => CuentaPorCobrar)
  declare cuenta?: CuentaPorCobrar;

  @Column(DataType.DECIMAL(12, 2))
  declare monto: number;

  @Default(DataType.NOW)
  @Column(DataType.DATEONLY)
  declare fecha_pago: string;

  @Column(DataType.ENUM('efectivo', 'transferencia', 'tarjeta', 'cheque', 'otro'))
  declare metodo_pago: MetodoPago;

  @Column(DataType.STRING(100))
  declare referencia: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare timbrado: boolean;

  @Column(DataType.TEXT)
  declare notas: string;
}
