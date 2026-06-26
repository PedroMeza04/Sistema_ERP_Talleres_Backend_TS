import type { Response } from 'express';
import { OrdenTrabajoService } from '../services/OrdenTrabajo.service';
import type { TenantRequest } from '../../../middleware/tenant';

export class OrdenTrabajoController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const orden = await OrdenTrabajoService.crear({ ...req.body, id_empresa: req.empresaId! });
      res.status(201).json({ mensaje: 'Orden creada exitosamente', orden });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const ordenes = await OrdenTrabajoService.getAll(req.empresaId!);
      res.status(200).json({ ordenes });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const orden = await OrdenTrabajoService.getById(req.params.id, req.empresaId!);
      res.status(200).json({ orden });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static libroVentas = async (req: TenantRequest, res: Response) => {
    try {
      const { desde, hasta } = req.query as { desde?: string; hasta?: string };
      const ventas = await OrdenTrabajoService.libroVentas(req.empresaId!, desde, hasta);
      res.status(200).json({ ventas });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: TenantRequest, res: Response) => {
    try {
      const orden = await OrdenTrabajoService.actualizar(req.params.id, req.empresaId!, req.body);
      res.status(200).json({ mensaje: 'Orden actualizada exitosamente', orden });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
