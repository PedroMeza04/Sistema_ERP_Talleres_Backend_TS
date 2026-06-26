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

  // Columnas nuevas de aquí para abajo — son los campos que el formulario de
  // Vehículo del frontend ya pedía pero que el modelo no soportaba todavía. Ya están
  // aplicadas en la base de Neon (vía sync({ alter: true }) en server.ts, no hay
  // migración formal por ahora). Ver Vehiculo.interface.ts para el detalle de cada uno.
  @Column(DataType.STRING(50))
  declare submodelo: string;

  @Column(DataType.STRING(30))
  declare tipo_combustible: string;

  @Column(DataType.STRING(30))
  declare transmision: string;

  @Column(DataType.STRING(50))
  declare motor: string;

  @Column(DataType.STRING(10))
  declare cilindros: string;

  @Column(DataType.STRING(10))
  declare tipo_traccion: string;

  @Column(DataType.STRING(30))
  declare numero_economico: string;

  @Column(DataType.STRING(100))
  declare aseguradora: string;

  @Column(DataType.DATEONLY)
  declare vencimiento_poliza: string;

  @Column(DataType.STRING(50))
  declare numero_poliza: string;

  @Column(DataType.INTEGER)
  declare nivel_combustible: number;

  @Column(DataType.ENUM('Excelente', 'Bueno', 'Regular', 'Malo'))
  declare condicion_general: 'Excelente' | 'Bueno' | 'Regular' | 'Malo';

  @Column(DataType.DATEONLY)
  declare fecha_recepcion: string;

  @Column(DataType.TEXT)
  declare danos_visibles: string;

  @Column(DataType.TEXT)
  declare objetos_valor: string;

  @Default([])
  @Column(DataType.JSON)
  declare checklist_exterior: string[];

  @Default([])
  @Column(DataType.JSON)
  declare checklist_interior: string[];

  @Column(DataType.TEXT)
  declare notas: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare activo: boolean;
}
