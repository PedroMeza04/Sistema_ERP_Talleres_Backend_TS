import type { Request, Response } from 'express';
import { EmpresaService } from '../services/Empresa.service';

export class EmpresaController {
  static crear = async (req: Request, res: Response) => {
    try {
      const empresa = await EmpresaService.crear(req.body);
      res.status(201).json({ mensaje: 'Empresa creada exitosamente', empresa });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (_req: Request, res: Response) => {
    try {
      const empresas = await EmpresaService.getAll();
      res.status(200).json({ empresas });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const empresa = await EmpresaService.getById(req.params.id);
      res.status(200).json({ empresa });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: Request, res: Response) => {
    try {
      await EmpresaService.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Empresa actualizada exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: Request, res: Response) => {
    try {
      await EmpresaService.desactivar(req.params.id);
      res.status(200).json({ mensaje: 'Empresa desactivada exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
