import { ICreateUsuario, IIniciarSesion } from '../interface/Auth.interface';
import { generateToken } from '../../../utils/jwt';
import { AuthRepository } from '../repositories/AuthRepository';
import { checkPassword, hashPassword } from '../../../utils/hashPassword';
import { UsuarioEmpresaRepository } from '../repositories/UsuarioEmpresaRepository';

export const AuthService = {
  // id_empresa es nuevo: antes se creaba el usuario y ya, sin quedar ligado a ninguna
  // empresa. Ahora, justo después de crearlo, lo asignamos a la empresa del admin que
  // lo está invitando (vía UsuarioEmpresa) — si no, el usuario nuevo no podría entrar
  // a ningún lado.
  createEmpleado: async (data: ICreateUsuario, id_empresa: string) => {
    data.password = await hashPassword(data.password);
    const usuario = await AuthRepository.crearUsuario(data);
    await UsuarioEmpresaRepository.asignar({ id_usuario: usuario.id_usuario, id_empresa, rol: data.rol });
    return usuario;
  },

  iniciarSesion: async (data: IIniciarSesion) => {
    const { username, password } = data;
    const usuario = await AuthRepository.usuarioPorUser(username);
    if (!usuario) throw new Error('Usuario no encontrado');

    const passwordCorrecta = await checkPassword(password, usuario.password_hash);
    if (!passwordCorrecta) throw new Error('Contraseña incorrecta.');

    const token = generateToken(usuario.id_usuario, username);
    const rol = usuario.rol_usuario;

    // Esto es nuevo: antes el login solo devolvía { token, rol }, y el frontend no
    // tenía manera de saber a qué empresa pertenece el usuario ni mostrar su nombre
    // sin otro request aparte. Aquí buscamos su primera empresa asignada y la
    // devolvemos junto con el resto de los datos.
    const empresas = await UsuarioEmpresaRepository.getEmpresasPorUsuario(usuario.id_usuario);
    const primeraEmpresa = (empresas[0] as any)?.empresa ?? null;

    return {
      token,
      rol,
      id_usuario: usuario.id_usuario,
      nombre_usuario: usuario.nombre_usuario ?? username,
      empresa: primeraEmpresa
        ? { id_empresa: primeraEmpresa.id_empresa, nombre: primeraEmpresa.nombre_empresa }
        : null,
    };
  },

  getAll: async (id_empresa: string) => {
    return await UsuarioEmpresaRepository.getUsuariosPorEmpresa(id_empresa);
  },
};
