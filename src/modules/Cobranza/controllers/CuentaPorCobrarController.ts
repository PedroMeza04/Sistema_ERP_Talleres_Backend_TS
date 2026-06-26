import type { Response } from 'express';
import { CuentaPorCobrarRepository } from '../repositories/CuentaPorCobrarRepository';
import type { TenantRequest } from '../../../middleware/tenant';

export class CuentaPorCobrarController {
  static crear = async (req: TenantRequest, res: Response) => {
    try {
      const cuenta = await CuentaPorCobrarRepository.crear({ ...req.body, id_empresa: req.empresaId! });
      res.status(201).json({ mensaje: 'Cuenta por cobrar creada', cuenta });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getAll = async (req: TenantRequest, res: Response) => {
    try {
      const cuentas = await CuentaPorCobrarRepository.getAll(req.empresaId!);
      res.status(200).json({ cuentas });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static getById = async (req: TenantRequest, res: Response) => {
    try {
      const cuenta = await CuentaPorCobrarRepository.getById(req.params.id, req.empresaId!);
      if (!cuenta) { res.status(404).json({ mensaje: 'Cuenta no encontrada' }); return; }
      res.status(200).json({ cuenta });
    } catch (error: any) {
      res.status(500).json({ mensaje: error.message });
    }
  };

  static agregarPago = async (req: TenantRequest, res: Response) => {
    try {
      const cuenta = await CuentaPorCobrarRepository.agregarPago(req.params.id, req.empresaId!, req.body);
      res.status(201).json({ mensaje: 'Pago registrado', cuenta });
    } catch (error: any) {
      res.status(400).json({ mensaje: error.message });
    }
  };
}
