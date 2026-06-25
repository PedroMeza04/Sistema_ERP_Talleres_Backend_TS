export interface ICreateEmpresa {
  nombre_empresa: string;
  rfc: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  telefono?: string;
  email?: string;
}

export interface IUpdateEmpresa {
  nombre_empresa?: string;
  rfc?: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
}
