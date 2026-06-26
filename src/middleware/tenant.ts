import { Response, NextFunction } from 'express';
import { AuthedRequest } from './auth';
import { UsuarioEmpresaRepository } from '../modules/Usuarios/repositories/UsuarioEmpresaRepository';
import { ROL_ADMIN } from '../modules/Usuarios/constants/roles';

// Archivo nuevo 🙂. Antes de esto, varias rutas confiaban ciegamente en el header
// X-Company-Id (o en el body) para saber de qué empresa era el request. El problema
// es que ese header lo manda el cliente, así que cualquier usuario logueado podía
// "pedir" datos de otra empresa solo cambiándolo.
//
// Estos dos middlewares hacen la validación real: revisan en UsuarioEmpresa que el
// usuario autenticado de verdad pertenece a esa empresa antes de dejarlo seguir. Si
// todo bien, dejan el id_empresa ya verificado en req.empresaId para que el resto del
// código (controllers, services) lo use con confianza, sin tener que volver a validar.
export type TenantRequest = AuthedRequest & { empresaId?: string };

// Para rutas donde basta con pertenecer a la empresa (ver clientes, ver vehículos, etc.)
export const requireCompanyMember = async (req: TenantRequest, res: Response, next: NextFunction): Promise<void> => {
  const id_empresa = req.headers['x-company-id'] as string;

  if (!id_empresa) {
    res.status(400).json({ mensaje: 'Header X-Company-Id requerido' });
    return;
  }

  // Aquí está el chequeo importante: ¿el usuario logueado de verdad está asignado a esta empresa?
  const acceso = await UsuarioEmpresaRepository.usuarioPerteneceEmpresa(req.user!.id_user, id_empresa);
  if (!acceso) {
    res.status(403).json({ mensaje: 'No tienes acceso a esta empresa' });
    return;
  }

  req.empresaId = id_empresa;
  next();
};

// Mismo chequeo que arriba, pero además exige que el rol del usuario en esa empresa
// sea admin. Se usa en cosas más delicadas, como crear usuarios nuevos.
export const requireCompanyAdmin = async (req: TenantRequest, res: Response, next: NextFunction): Promise<void> => {
  const id_empresa = req.headers['x-company-id'] as string;

  if (!id_empresa) {
    res.status(400).json({ mensaje: 'Header X-Company-Id requerido' });
    return;
  }

  const acceso = await UsuarioEmpresaRepository.usuarioPerteneceEmpresa(req.user!.id_user, id_empresa);
  if (!acceso || acceso.rol !== ROL_ADMIN) {
    res.status(403).json({ mensaje: 'Requiere rol de administrador en esta empresa' });
    return;
  }

  req.empresaId = id_empresa;
  next();
};
