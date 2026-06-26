import { v4 as uuidv4 } from 'uuid';
import type { Includeable } from 'sequelize';
import CuentaPorCobrar from '../model/CuentaPorCobrar';
import PagoCuentaPorCobrar from '../model/PagoCuentaPorCobrar';
import Cliente from '../../Clientes/model/Cliente';
import OrdenTrabajo from '../../OrdenTrabajo/model/OrdenTrabajo';

const includeAll: Includeable[] = [
  { model: Cliente, attributes: ['id_cliente', 'nombre', 'telefono', 'email'] },
  { model: OrdenTrabajo, attributes: ['id_orden', 'numero_orden', 'total'] },
  { model: PagoCuentaPorCobrar, order: [['createdAt', 'ASC']] as [string, string][] },
];

export const CuentaPorCobrarRepository = {
  crear: async (data: {
    id_empresa: string;
    id_cliente: string;
    id_orden: string;
    total: number;
    requiere_factura: boolean;
    notas?: string;
  }) => {
    const cuenta = await CuentaPorCobrar.create({
      id_cuenta: uuidv4(),
      ...data,
      total_pagado: 0,
      saldo_pendiente: data.total,
      estado: 'pendiente',
    });
    return CuentaPorCobrarRepository.getById(cuenta.id_cuenta, data.id_empresa);
  },

  getAll: async (id_empresa: string) => {
    return CuentaPorCobrar.findAll({
      where: { id_empresa },
      include: includeAll,
      order: [['createdAt', 'DESC']],
    });
  },

  getById: async (id_cuenta: string, id_empresa: string) => {
    return CuentaPorCobrar.findOne({
      where: { id_cuenta, id_empresa },
      include: includeAll,
    });
  },

  agregarPago: async (
    id_cuenta: string,
    id_empresa: string,
    pago: { monto: number; fecha_pago?: string; metodo_pago: string; referencia?: string; notas?: string }
  ) => {
    const cuenta = await CuentaPorCobrar.findOne({ where: { id_cuenta, id_empresa } });
    if (!cuenta) throw new Error('Cuenta no encontrada');
    if (cuenta.estado === 'pagada') throw new Error('La cuenta ya está liquidada');

    const monto = Number(pago.monto);
    if (monto <= 0) throw new Error('El monto debe ser mayor a cero');
    if (monto > Number(cuenta.saldo_pendiente)) throw new Error('El pago excede el saldo pendiente');

    await PagoCuentaPorCobrar.create({
      id_pago: uuidv4(),
      id_cuenta,
      monto,
      fecha_pago: pago.fecha_pago ?? new Date().toISOString().slice(0, 10),
      metodo_pago: pago.metodo_pago,
      referencia: pago.referencia ?? '',
      notas: pago.notas ?? '',
    });

    const nuevoTotalPagado = Number(cuenta.total_pagado) + monto;
    const nuevoSaldo       = Number(cuenta.total) - nuevoTotalPagado;
    const nuevoEstado      = nuevoSaldo <= 0 ? 'pagada' : 'parcial';

    await cuenta.update({
      total_pagado:    nuevoTotalPagado,
      saldo_pendiente: Math.max(0, nuevoSaldo),
      estado:          nuevoEstado,
    });

    return CuentaPorCobrarRepository.getById(id_cuenta, id_empresa);
  },
};
