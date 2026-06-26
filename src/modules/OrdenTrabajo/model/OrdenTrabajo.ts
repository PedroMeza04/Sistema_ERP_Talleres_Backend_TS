import {
  Table, Column, Model, PrimaryKey, DataType,
  Default, ForeignKey, BelongsTo, HasMany, Index,
} from 'sequelize-typescript';
import Empresa from '../../Empresas/model/Empresa';
import Cliente from '../../Clientes/model/Cliente';
import Vehiculo from '../../Clientes/model/Vehiculo';
import OrdenServicio from './OrdenServicio';
import OrdenRefaccion from './OrdenRefaccion';

export type EstadoOrden = 'Pendiente' | 'En progreso' | 'Completada' | 'Cancelada';
export type PrioridadOrden = 'Normal' | 'Alta' | 'Urgente';

@Table({ tableName: 'orden_trabajo', timestamps: true })
export default class OrdenTrabajo extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id_orden: string;

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

  @ForeignKey(() => Vehiculo)
  @Index
  @Column(DataType.UUID)
  declare id_vehiculo: string;

  @BelongsTo(() => Vehiculo)
  declare vehiculo?: Vehiculo;

  @Index
  @Column(DataType.STRING(30))
  declare numero_orden: string;

  @Default('Pendiente')
  @Column(DataType.ENUM('Pendiente', 'En progreso', 'Completada', 'Cancelada'))
  declare estado: EstadoOrden;

  @Default('Normal')
  @Column(DataType.ENUM('Normal', 'Alta', 'Urgente'))
  declare prioridad: PrioridadOrden;

  @Column(DataType.STRING(100))
  declare tecnico_nombre: string;

  @Column(DataType.INTEGER)
  declare kilometraje_entrada: number;

  @Column(DataType.DATEONLY)
  declare fecha_prometida: string;

  @Column(DataType.DATE)
  declare fecha_completada: Date;

  @Column(DataType.TEXT)
  declare descripcion_problema: string;

  @Column(DataType.TEXT)
  declare diagnostico: string;

  @Column(DataType.TEXT)
  declare notas: string;

  @Default(0)
  @Column(DataType.DECIMAL(12, 2))
  declare total_mano_obra: number;

  @Default(0)
  @Column(DataType.DECIMAL(12, 2))
  declare total_refacciones: number;

  @Default(0)
  @Column(DataType.DECIMAL(12, 2))
  declare total: number;

  @Column(DataType.ENUM('contado', 'credito'))
  declare tipo_pago: 'contado' | 'credito' | null;

  @Column(DataType.STRING(30))
  declare metodo_pago: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare requiere_factura: boolean;

  @HasMany(() => OrdenServicio)
  declare servicios?: OrdenServicio[];

  @HasMany(() => OrdenRefaccion)
  declare refacciones?: OrdenRefaccion[];
}
