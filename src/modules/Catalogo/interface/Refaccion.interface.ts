export interface ICreateRefaccion {
  id_empresa: string;
  sku: string;
  nombre: string;
  descripcion?: string;
  categoria: string;
  marca?: string;
  proveedor_nombre?: string;
  costo: number;
  precio: number;
  stock?: number;
  stock_minimo?: number;
  unidad?: string;
  ubicacion?: string;
}

export interface IUpdateRefaccion {
  sku?: string;
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  marca?: string;
  proveedor_nombre?: string;
  costo?: number;
  precio?: number;
  stock?: number;
  stock_minimo?: number;
  unidad?: string;
  ubicacion?: string;
  activo?: boolean;
}
