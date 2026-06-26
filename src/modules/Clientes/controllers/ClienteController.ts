import type { Response } from 'express';
import { ClienteService } from '../services/Cliente.service';
import type { TenantRequest } from '../../../middleware/tenant';

export class ClienteController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const cliente = await ClienteService.crear({ ...req.body, id_empresa: req.empresaId! });
      res.status(201).json({ mensaje: 'Cliente creado exitosamente', cliente });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const clientes = await ClienteService.getAll(req.empresaId!);
      res.status(200).json({ clientes });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const cliente = await ClienteService.getById(req.params.id, req.empresaId!);
      res.status(200).json({ cliente });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: TenantRequest, res: Response) => {
    try {
      await ClienteService.actualizar(req.params.id, req.empresaId!, req.body);
      res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: TenantRequest, res: Response) => {
    try {
      await ClienteService.desactivar(req.params.id, req.empresaId!);
      res.status(200).json({ mensaje: 'Cliente desactivado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
