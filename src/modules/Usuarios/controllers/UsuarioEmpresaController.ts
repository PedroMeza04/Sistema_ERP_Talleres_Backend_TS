import type { Request, Response } from 'express';
import { UsuarioEmpresaService } from '../services/UsuarioEmpresa.service';

export class UsuarioEmpresaController {
  static asignar = async (req: Request, res: Response) => {
    try {
      const acceso = await UsuarioEmpresaService.asignar(req.body);
      res.status(201).json({ mensaje: 'Acceso asignado exitosamente', acceso });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getEmpresasPorUsuario = async (req: Request, res: Response) => {
    try {
      const empresas = await UsuarioEmpresaService.getEmpresasPorUsuario(req.params.id_usuario);
      res.status(200).json({ empresas });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getUsuariosPorEmpresa = async (req: Request, res: Response) => {
    try {
      const usuarios = await UsuarioEmpresaService.getUsuariosPorEmpresa(req.params.id_empresa);
      res.status(200).json({ usuarios });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static actualizarAcceso = async (req: Request, res: Response) => {
    try {
      await UsuarioEmpresaService.actualizarAcceso(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Acceso actualizado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static revocar = async (req: Request, res: Response) => {
    try {
      await UsuarioEmpresaService.revocar(req.params.id);
      res.status(200).json({ mensaje: 'Acceso revocado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
