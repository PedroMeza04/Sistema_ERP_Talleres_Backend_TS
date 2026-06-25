export interface IVehiculoInline {
  plate: string;
  brand: string;
  model: string;
  year?: number;
  vin?: string;
  mileage?: number;
}

export interface ICreateCliente {
  id_empresa: string;
  tipo_cliente?: 'fisica' | 'empresa';
  nombre: string;
  empresa_nombre?: string;
  es_frecuente?: boolean;
  telefono?: string;
  telefono2?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  requiere_facturacion?: boolean;
  rfc?: string;
  razon_social?: string;
  regimen_fiscal?: string;
  uso_cfdi?: string;
  email_fiscal?: string;
  codigo_postal_fiscal?: string;
  notas?: string;
  vehicles?: IVehiculoInline[];
}

export interface IUpdateCliente {
  tipo_cliente?: 'fisica' | 'empresa';
  nombre?: string;
  empresa_nombre?: string;
  es_frecuente?: boolean;
  telefono?: string;
  telefono2?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  requiere_facturacion?: boolean;
  rfc?: string;
  razon_social?: string;
  regimen_fiscal?: string;
  uso_cfdi?: string;
  email_fiscal?: string;
  codigo_postal_fiscal?: string;
  notas?: string;
  activo?: boolean;
}
