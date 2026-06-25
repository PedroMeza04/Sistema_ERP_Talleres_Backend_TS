export interface ICreateVehiculo {
  id_cliente: string;
  marca: string;
  modelo: string;
  anio: number;
  placa?: string;
  color?: string;
  numero_serie?: string;
  kilometraje?: string;
}

export interface IUpdateVehiculo {
  marca?: string;
  modelo?: string;
  anio?: number;
  placa?: string;
  color?: string;
  numero_serie?: string;
  kilometraje?: string;
  activo?: boolean;
}
