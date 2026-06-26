import { Response, NextFunction } from 'express';
import { AuthedRequest } from './auth';
import { UsuarioEmpresaRepository } from '../modules/Usuarios/repositories/UsuarioEmpresaRepository';
import { ROL_ADMIN } from '../modules/Usuarios/constants/roles';

export type TenantRequest = AuthedRequest & { empresaId?: string };

export const requireCompanyMember = async (req: TenantRequest, res: Response, next: NextFunction): Promise<void> => {
  const id_empresa = req.headers['x-company-id'] as string;

  if (!id_empresa) {
    res.status(400).json({ mensaje: 'Header X-Company-Id requerido' });
    return;
  }

  const acceso = await UsuarioEmpresaRepository.usuarioPerteneceEmpresa(req.user!.id_user, id_empresa);
  if (!acceso) {
    res.status(403).json({ mensaje: 'No tienes acceso a esta empresa' });
    return;
  }

  req.empresaId = id_empresa;
  next();
};

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
