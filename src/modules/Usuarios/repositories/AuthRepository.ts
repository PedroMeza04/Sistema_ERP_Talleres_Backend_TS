import { v4 as uuidv4 } from 'uuid';
import { ICreateUsuario } from '../interface/Auth.interface';

import Usuario from '../model/Usuarios';

export const AuthRepository = {
  crearUsuario: async (data: ICreateUsuario) => {
    //console.log(data);
    const usuarioExistente = await Usuario.findOne({
      where: { username: data.username }
    });

    if (usuarioExistente) {
      throw new Error(`Ya existe un usuario asignado al empleado. El usuario es: ${usuarioExistente.username}`);
    }
    const nuevoUUID = uuidv4();

    return await Usuario.create({
      id_usuario: nuevoUUID,
      nombre_usuario: data.nombre_usuario,
      apellido_pat_usuario: data.apellido_pat_usuario,
      apellido_mat_usuario: data.apellido_mat_usuario,
      username: data.username,
      password_hash: data.password,
      rol_usuario: data.rol,
      activo: data.activo ?? true,
    });
  },

  actualizarContra: async (usuarioweb: string, nuevaContraHasheada: string) => {
    const usuario = await Usuario.findOne({ where: { username: usuarioweb } });
    if (!usuario) {
      throw new Error('Usuario no encontrado para actualizar la contraseña.');
    }

    return await Usuario.update({ password_user: nuevaContraHasheada }, { where: { username: usuarioweb } });
  },

  getAll: async () => {
    return await Usuario.findAll({
      attributes: ['id_usuario', 'username', 'rol_usuario'],
    });
  },
  usuarioPorUser: async (username: string) => {
    return await Usuario.findOne({
      where: { username }
    });
  }
};
