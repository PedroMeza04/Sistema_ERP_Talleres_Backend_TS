import type { Request, Response } from 'express';
import { VehiculoService } from '../services/Vehiculo.service';

export class VehiculoController {
  static crear = async (req: Request, res: Response) => {
    try {
      const vehiculo = await VehiculoService.crear(req.body);
      res.status(201).json({ mensaje: 'Vehículo creado exitosamente', vehiculo });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getByCliente = async (req: Request, res: Response) => {
    try {
      const vehiculos = await VehiculoService.getByCliente(req.params.id_cliente);
      res.status(200).json({ vehiculos });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const vehiculo = await VehiculoService.getById(req.params.id);
      res.status(200).json({ vehiculo });
    } catch (error: any) {
      res.status(404).json({ mensaje: error.message });
    }
  };

  static actualizar = async (req: Request, res: Response) => {
    try {
      await VehiculoService.actualizar(req.params.id, req.body);
      res.status(200).json({ mensaje: 'Vehículo actualizado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static desactivar = async (req: Request, res: Response) => {
    try {
      await VehiculoService.desactivar(req.params.id);
      res.status(200).json({ mensaje: 'Vehículo desactivado exitosamente' });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };
}
