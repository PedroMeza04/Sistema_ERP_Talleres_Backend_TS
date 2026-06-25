export interface IAsignarEmpresa {
  id_usuario: string;
  id_empresa: string;
  rol?: number;
}

export interface IUpdateAcceso {
  rol?: number;
  activo?: boolean;
}
