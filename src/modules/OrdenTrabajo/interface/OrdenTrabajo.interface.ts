import type { EstadoOrden, PrioridadOrden } from '../model/OrdenTrabajo';

export interface ILineaServicio {
  id_servicio: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface ILineaRefaccion {
  id_refaccion: string;
  nombre: string;
  sku: string;
  precio: number;
  cantidad: number;
}

export interface ICreateOrden {
  id_empresa: string;
  id_cliente: string;
  id_vehiculo: string;
  tecnico_nombre?: string;
  prioridad?: PrioridadOrden;
  kilometraje_entrada?: number;
  fecha_prometida?: string;
  descripcion_problema?: string;
  diagnostico?: string;
  notas?: string;
  servicios?: ILineaServicio[];
  refacciones?: ILineaRefaccion[];
}

export interface IUpdateOrden extends Partial<Omit<ICreateOrden, 'id_empresa'>> {
  estado?: EstadoOrden;
}
