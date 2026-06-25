import { IAsignarEmpresa, IUpdateAcceso } from '../interface/UsuarioEmpresa.interface';
import { UsuarioEmpresaRepository } from '../repositories/UsuarioEmpresaRepository';

export const UsuarioEmpresaService = {
  asignar: async (data: IAsignarEmpresa) => {
    return await UsuarioEmpresaRepository.asignar(data);
  },

  getEmpresasPorUsuario: async (id_usuario: string) => {
    return await UsuarioEmpresaRepository.getEmpresasPorUsuario(id_usuario);
  },

  getUsuariosPorEmpresa: async (id_empresa: string) => {
    return await UsuarioEmpresaRepository.getUsuariosPorEmpresa(id_empresa);
  },

  actualizarAcceso: async (id_usuario_empresa: string, data: IUpdateAcceso) => {
    return await UsuarioEmpresaRepository.actualizarAcceso(id_usuario_empresa, data);
  },

  revocar: async (id_usuario_empresa: string) => {
    return await UsuarioEmpresaRepository.revocar(id_usuario_empresa);
  }
};
