import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import OrdenTrabajo from '../model/OrdenTrabajo';
import OrdenServicio from '../model/OrdenServicio';
import OrdenRefaccion from '../model/OrdenRefaccion';
import Cliente from '../../Clientes/model/Cliente';
import Vehiculo from '../../Clientes/model/Vehiculo';
import { ICreateOrden, IUpdateOrden } from '../interface/OrdenTrabajo.interface';

const includeAll = [
  { model: Cliente, attributes: ['id_cliente', 'nombre', 'telefono', 'email'] },
  { model: Vehiculo, attributes: ['id_vehiculo', 'marca', 'modelo', 'anio', 'placa'] },
  { model: OrdenServicio },
  { model: OrdenRefaccion },
];

async function nextNumero(id_empresa: string): Promise<string> {
  const count = await OrdenTrabajo.count({ where: { id_empresa } });
  return `OT-${String(count + 1).padStart(4, '0')}`;
}

function calcTotals(servicios: { precio: number; cantidad: number }[], refacciones: { precio: number; cantidad: number }[]) {
  const mano_obra   = servicios.reduce((s, l)   => s + Number(l.precio) * l.cantidad, 0);
  const refac       = refacciones.reduce((s, l) => s + Number(l.precio) * l.cantidad, 0);
  return { mano_obra, refac, total: mano_obra + refac };
}

export const OrdenTrabajoRepository = {
  crear: async (data: ICreateOrden) => {
    const { servicios = [], refacciones = [], ...ordenData } = data;
    const numero_orden = await nextNumero(data.id_empresa);
    const { mano_obra, refac, total } = calcTotals(servicios, refacciones);

    const orden = await OrdenTrabajo.create({
      id_orden: uuidv4(),
      numero_orden,
      ...ordenData,
      total_mano_obra: mano_obra,
      total_refacciones: refac,
      total,
    });

    if (servicios.length) {
      await OrdenServicio.bulkCreate(
        servicios.map((s) => ({ id_orden_servicio: uuidv4(), id_orden: orden.id_orden, ...s }))
      );
    }
    if (refacciones.length) {
      await OrdenRefaccion.bulkCreate(
        refacciones.map((r) => ({ id_orden_refaccion: uuidv4(), id_orden: orden.id_orden, ...r }))
      );
    }

    return OrdenTrabajoRepository.getById(orden.id_orden, data.id_empresa);
  },

  getAll: async (id_empresa: string) => {
    return OrdenTrabajo.findAll({
      where: { id_empresa },
      include: includeAll,
      order: [['createdAt', 'DESC']],
    });
  },

  getById: async (id_orden: string, id_empresa: string) => {
    return OrdenTrabajo.findOne({ where: { id_orden, id_empresa }, include: includeAll });
  },

  actualizar: async (id_orden: string, id_empresa: string, data: IUpdateOrden) => {
    const { servicios, refacciones, ...ordenData } = data;

    const extra: Record<string, unknown> = {};
    if (data.estado === 'Completada') extra.fecha_completada = new Date();

    if (servicios !== undefined || refacciones !== undefined) {
      const orden = await OrdenTrabajo.findOne({ where: { id_orden, id_empresa }, include: includeAll });
      const newSvc  = servicios  ?? (orden?.servicios  ?? []).map((s) => ({ precio: s.precio, cantidad: s.cantidad }));
      const newRef  = refacciones ?? (orden?.refacciones ?? []).map((r) => ({ precio: r.precio, cantidad: r.cantidad }));
      const { mano_obra, refac, total } = calcTotals(newSvc as any, newRef as any);
      extra.total_mano_obra  = mano_obra;
      extra.total_refacciones = refac;
      extra.total = total;
    }

    await OrdenTrabajo.update({ ...ordenData, ...extra }, { where: { id_orden, id_empresa } });

    if (servicios !== undefined) {
      await OrdenServicio.destroy({ where: { id_orden } });
      if (servicios.length) {
        await OrdenServicio.bulkCreate(
          servicios.map((s) => ({ id_orden_servicio: uuidv4(), id_orden, ...s }))
        );
      }
    }
    if (refacciones !== undefined) {
      await OrdenRefaccion.destroy({ where: { id_orden } });
      if (refacciones.length) {
        await OrdenRefaccion.bulkCreate(
          refacciones.map((r) => ({ id_orden_refaccion: uuidv4(), id_orden, ...r }))
        );
      }
    }

    return OrdenTrabajoRepository.getById(id_orden, id_empresa);
  },

  libroVentas: async (id_empresa: string, desde?: string, hasta?: string) => {
    const where: Record<string, unknown> = { id_empresa, estado: 'Completada' };
    if (desde || hasta) {
      where['fecha_completada'] = {
        ...(desde ? { [Op.gte]: new Date(desde) } : {}),
        ...(hasta ? { [Op.lte]: new Date(hasta + 'T23:59:59') } : {}),
      };
    }
    return OrdenTrabajo.findAll({
      where,
      include: [
        { model: Cliente, attributes: ['id_cliente', 'nombre', 'email', 'telefono'] },
        { model: Vehiculo, attributes: ['placa', 'marca', 'modelo'] },
      ],
      order: [['fecha_completada', 'DESC']],
    });
  },

  buscar: async (id_empresa: string, q: string) => {
    return OrdenTrabajo.findAll({
      where: {
        id_empresa,
        [Op.or]: [
          { numero_orden: { [Op.iLike]: `%${q}%` } },
          { tecnico_nombre: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: [
        { model: Cliente, attributes: ['nombre'], where: q ? { nombre: { [Op.iLike]: `%${q}%` } } : undefined, required: false },
      ],
      limit: 20,
      order: [['createdAt', 'DESC']],
    });
  },
};
