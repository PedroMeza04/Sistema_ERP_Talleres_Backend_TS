import type { Response } from 'express';
import { VehiculoService } from '../services/Vehiculo.service';
import type { TenantRequest } from '../../../middleware/tenant';

// Igual que en ClienteController: ahora todo pasa por req.empresaId (ya validado por
// el middleware de tenant) en vez de confiar en headers o el body.
export class VehiculoController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const vehiculo = await VehiculoService.crear(req.body, req.empresaId!);
      res.status(201).json({ mensaje: 'Vehículo creado exitosamente', vehiculo });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  // Método nuevo, para el GET '/' del router (listado global de vehículos).
  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const vehiculos = await VehiculoService.getAll(req.empresaId!);
      res.status(200).json({ vehiculos });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getByCliente = async (req: TenantRequest, res: Response) => {
    try {
      const vehiculos = await VehiculoService.getByCliente(req.params.id_cliente, req.empresaId!);
      res.status(200).json({ vehiculos });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const vehiculo = await VehiculoService.getById(req.params.id, req.empresaId!);
      res.status(200).json({ vehiculo });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: TenantRequest, res: Response) => {
    try {
      await VehiculoService.actualizar(req.params.id, req.empresaId!, req.body);
      res.status(200).json({ mensaje: 'Vehículo actualizado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: TenantRequest, res: Response) => {
    try {
      await VehiculoService.desactivar(req.params.id, req.empresaId!);
      res.status(200).json({ mensaje: 'Vehículo desactivado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
