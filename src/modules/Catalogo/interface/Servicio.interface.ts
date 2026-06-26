export interface IRequiredPart {
  id_refaccion: string;
  cantidad: number;
}

export interface ICreateServicio {
  id_empresa: string;
  nombre: string;
  categoria: string;
  descripcion?: string;
  precio_base: number;
  horas_estimadas?: number;
  activo?: boolean;
  notas?: string;
  refacciones?: IRequiredPart[];
}

export interface IUpdateServicio {
  nombre?: string;
  categoria?: string;
  descripcion?: string;
  precio_base?: number;
  horas_estimadas?: number;
  activo?: boolean;
  notas?: string;
  refacciones?: IRequiredPart[];
}
