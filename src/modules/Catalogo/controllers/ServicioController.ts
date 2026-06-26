import type { Response } from 'express';
import { ServicioService } from '../services/Servicio.service';
import type { TenantRequest } from '../../../middleware/tenant';

export class ServicioController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const servicio = await ServicioService.crear({ ...req.body, id_empresa: req.empresaId! });
      res.status(201).json({ mensaje: 'Servicio creado exitosamente', servicio });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const servicios = await ServicioService.getAll(req.empresaId!);
      res.status(200).json({ servicios });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const servicio = await ServicioService.getById(req.params.id, req.empresaId!);
      res.status(200).json({ servicio });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: TenantRequest, res: Response) => {
    try {
      const servicio = await ServicioService.actualizar(req.params.id, req.empresaId!, req.body);
      res.status(200).json({ mensaje: 'Servicio actualizado exitosamente', servicio });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: TenantRequest, res: Response) => {
    try {
      await ServicioService.desactivar(req.params.id, req.empresaId!);
      res.status(200).json({ mensaje: 'Servicio desactivado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
