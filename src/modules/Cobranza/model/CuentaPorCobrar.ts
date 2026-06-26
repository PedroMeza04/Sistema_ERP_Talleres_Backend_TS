import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, BelongsTo, HasMany, Index,
} from 'sequelize-typescript';
import Empresa from '../../Empresas/model/Empresa';
import Cliente from '../../Clientes/model/Cliente';
import OrdenTrabajo from '../../OrdenTrabajo/model/OrdenTrabajo';
import PagoCuentaPorCobrar from './PagoCuentaPorCobrar';

export type EstadoCuenta = 'pendiente' | 'parcial' | 'pagada' | 'cancelada';

@Table({ tableName: 'cuenta_por_cobrar', timestamps: true })
export default class CuentaPorCobrar extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_cuenta: string;

  @ForeignKey(() => Empresa)
  @Index
  @Column(DataType.UUID)
  declare id_empresa: string;

  @BelongsTo(() => Empresa)
  declare empresa?: Empresa;

  @ForeignKey(() => Cliente)
  @Index
  @Column(DataType.UUID)
  declare id_cliente: string;

  @BelongsTo(() => Cliente)
  declare cliente?: Cliente;

  @ForeignKey(() => OrdenTrabajo)
  @Column(DataType.UUID)
  declare id_orden: string;

  @BelongsTo(() => OrdenTrabajo)
  declare orden?: OrdenTrabajo;

  @Column(DataType.DECIMAL(12, 2))
  declare total: number;

  @Default(0)
  @Column(DataType.DECIMAL(12, 2))
  declare total_pagado: number;

  @Column(DataType.DECIMAL(12, 2))
  declare saldo_pendiente: number;

  @Default('pendiente')
  @Column(DataType.ENUM('pendiente', 'parcial', 'pagada', 'cancelada'))
  declare estado: EstadoCuenta;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare requiere_factura: boolean;

  @Column(DataType.TEXT)
  declare notas: string;

  @HasMany(() => PagoCuentaPorCobrar)
  declare pagos?: PagoCuentaPorCobrar[];
}
