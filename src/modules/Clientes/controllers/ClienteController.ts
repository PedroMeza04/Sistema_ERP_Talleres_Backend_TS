import type { Request, Response } from 'express';
import { ClienteService } from '../services/Cliente.service';

export class ClienteController {
  static crear = async (req: Request, res: Response) => {
    try {
      const id_empresa = (req.headers['x-company-id'] as string) ?? req.body.id_empresa;
      if (!id_empresa) {
        res.status(400).json({ mensaje: 'id_empresa requerido (header X-Company-Id)' });
        return;
      }
      const cliente = await ClienteService.crear({ ...req.body, id_empresa });
      res.status(201).json({ mensaje: 'Cliente creado exitosamente', cliente });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const id_empresa = req.params.id_empresa ?? (req.headers['x-company-id'] as string);
      const clientes = await ClienteService.getAll(id_empresa);
      res.status(200).json({ clientes });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const cliente = await ClienteService.getById(req.params.id);
      res.status(200).json({ cliente });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: Request, res: Response) => {
    try {
      await ClienteService.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: Request, res: Response) => {
    try {
      await ClienteService.desactivar(req.params.id);
      res.status(200).json({ mensaje: 'Cliente desactivado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
