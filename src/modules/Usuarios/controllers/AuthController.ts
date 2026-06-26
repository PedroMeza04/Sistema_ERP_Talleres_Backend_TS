import type { Request, Response } from 'express';
import { AuthService } from '../services/Auth.service';
import type { TenantRequest } from '../../../middleware/tenant';

export class AuthController {
  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const usuarios = await AuthService.getAll(req.empresaId!);
      res.status(200).json({ usuarios });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static createUsuario = async (req: TenantRequest, res: Response) => {
    try {
      const usuario = await AuthService.createEmpleado(req.body, req.empresaId!);
      res.status(201).json({
        mensaje: 'Usuario creado exitosamente',
        usuario: {
          id_usuario: usuario.id_usuario,
          username: usuario.username,
          nombre_usuario: usuario.nombre_usuario,
          rol_usuario: usuario.rol_usuario,
        },
      });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static iniciarSesion = async (req: Request, res: Response) => {
    try {
      const result = await AuthService.iniciarSesion(req.body);
      res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        token: result.token,
        rol: result.rol,
        id_usuario: result.id_usuario,
        nombre_usuario: result.nombre_usuario,
        empresa: result.empresa
      });
    } catch (error: any) {
      res.status(401).json({ mensaje: error.message || 'Error al iniciar sesión' });
    }
  };
}
