export interface ICreateVehiculo {
  id_cliente: string;
  marca: string;
  modelo: string;
  anio: number;
  placa?: string;
  color?: string;
  numero_serie?: string;
  kilometraje?: string;
  // De aquí para abajo son todos los campos nuevos — el formulario del frontend ya
  // manejaba estos datos (submodelo, seguro, checklist de recepción, etc.) pero el
  // modelo viejo solo tenía los 8 de arriba, así que se quedaban fuera. Se agregaron
  // tal cual los nombra el formulario para no tener que mapear nada de más.
  submodelo?: string;
  tipo_combustible?: string;
  transmision?: string;
  motor?: string;
  cilindros?: string;
  tipo_traccion?: string;
  numero_economico?: string;
  aseguradora?: string;
  vencimiento_poliza?: string;
  numero_poliza?: string;
  nivel_combustible?: number;
  condicion_general?: 'Excelente' | 'Bueno' | 'Regular' | 'Malo';
  fecha_recepcion?: string;
  danos_visibles?: string;
  objetos_valor?: string;
  checklist_exterior?: string[];
  checklist_interior?: string[];
  notas?: string;
}

export interface IUpdateVehiculo {
  marca?: string;
  modelo?: string;
  anio?: number;
  placa?: string;
  color?: string;
  numero_serie?: string;
  kilometraje?: string;
  submodelo?: string;
  tipo_combustible?: string;
  transmision?: string;
  motor?: string;
  cilindros?: string;
  tipo_traccion?: string;
  numero_economico?: string;
  aseguradora?: string;
  vencimiento_poliza?: string;
  numero_poliza?: string;
  nivel_combustible?: number;
  condicion_general?: 'Excelente' | 'Bueno' | 'Regular' | 'Malo';
  fecha_recepcion?: string;
  danos_visibles?: string;
  objetos_valor?: string;
  checklist_exterior?: string[];
  checklist_interior?: string[];
  notas?: string;
  activo?: boolean;
}
