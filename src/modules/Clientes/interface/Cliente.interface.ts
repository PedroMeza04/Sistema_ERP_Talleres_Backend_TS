export interface ICreateCliente {
  id_empresa: string;
  nombre: string;
  apellido_pat: string;
  apellido_mat?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export interface IUpdateCliente {
  nombre?: string;
  apellido_pat?: string;
  apellido_mat?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  activo?: boolean;
}
