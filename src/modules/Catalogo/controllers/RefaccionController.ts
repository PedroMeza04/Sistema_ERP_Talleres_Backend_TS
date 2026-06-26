import type { Response } from 'express';
import { RefaccionService } from '../services/Refaccion.service';
import type { TenantRequest } from '../../../middleware/tenant';

export class RefaccionController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const refaccion = await RefaccionService.crear({ ...req.body, id_empresa: req.empresaId! });
      res.status(201).json({ mensaje: 'Refacción creada exitosamente', refaccion });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const refacciones = await RefaccionService.getAll(req.empresaId!);
      res.status(200).json({ refacciones });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static buscar = async (req: TenantRequest, res: Response) => {
    try {
      const q = (req.query.q as string) ?? '';
      const refacciones = await RefaccionService.buscar(req.empresaId!, q);
      res.status(200).json({ refacciones });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const refaccion = await RefaccionService.getById(req.params.id, req.empresaId!);
      res.status(200).json({ refaccion });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: TenantRequest, res: Response) => {
    try {
      await RefaccionService.actualizar(req.params.id, req.empresaId!, req.body);
      res.status(200).json({ mensaje: 'Refacción actualizada exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: TenantRequest, res: Response) => {
    try {
      await RefaccionService.desactivar(req.params.id, req.empresaId!);
      res.status(200).json({ mensaje: 'Refacción desactivada exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
