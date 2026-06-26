import { v4 as uuidv4 } from 'uuid';
import UsuarioEmpresa from '../model/UsuarioEmpresa';
import Empresa from '../../Empresas/model/Empresa';
import Usuario from '../model/Usuarios';
import { IAsignarEmpresa, IUpdateAcceso } from '../interface/UsuarioEmpresa.interface';

export const UsuarioEmpresaRepository = {
  // Método nuevo: es el corazón de la validación multi-tenant (lo usa
  // middleware/tenant.ts). Devuelve el vínculo si el usuario sí pertenece a esa
  // empresa, o null si no — no asumimos nada, siempre se consulta la base.
  usuarioPerteneceEmpresa: async (id_usuario: string, id_empresa: string) => {
    return await UsuarioEmpresa.findOne({
      where: { id_usuario, id_empresa, activo: true }
    });
  },

  asignar: async (data: IAsignarEmpresa) => {
    const existente = await UsuarioEmpresa.findOne({
      where: { id_usuario: data.id_usuario, id_empresa: data.id_empresa }
    });
    if (existente) throw new Error('El usuario ya tiene acceso a esta empresa.');

    return await UsuarioEmpresa.create({ id_usuario_empresa: uuidv4(), ...data });
  },

  getEmpresasPorUsuario: async (id_usuario: string) => {
    return await UsuarioEmpresa.findAll({
      where: { id_usuario, activo: true },
      include: [{ model: Empresa, attributes: ['id_empresa', 'nombre_empresa', 'rfc', 'ciudad'] }],
      attributes: ['id_usuario_empresa', 'rol', 'activo']
    });
  },

  getUsuariosPorEmpresa: async (id_empresa: string) => {
    return await UsuarioEmpresa.findAll({
      where: { id_empresa, activo: true },
      include: [{ model: Usuario, attributes: ['id_usuario', 'username', 'nombre_usuario', 'apellido_pat_usuario'] }],
      attributes: ['id_usuario_empresa', 'rol', 'activo']
    });
  },

  actualizarAcceso: async (id_usuario_empresa: string, data: IUpdateAcceso) => {
    return await UsuarioEmpresa.update(data, { where: { id_usuario_empresa } });
  },

  revocar: async (id_usuario_empresa: string) => {
    return await UsuarioEmpresa.update({ activo: false }, { where: { id_usuario_empresa } });
  }
};
