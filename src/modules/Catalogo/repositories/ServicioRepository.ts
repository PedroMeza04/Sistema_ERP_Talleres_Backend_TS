import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import Servicio from '../model/Servicio';
import Refaccion from '../model/Refaccion';
import ServicioRefaccion from '../model/ServicioRefaccion';
import { ICreateServicio, IUpdateServicio } from '../interface/Servicio.interface';

const includeRefacciones = {
  model: Refaccion,
  attributes: ['id_refaccion', 'nombre', 'sku', 'precio'],
  through: { attributes: ['cantidad'] },
  required: false,
};

export const ServicioRepository = {
  crear: async (data: ICreateServicio) => {
    const { refacciones, ...servicioData } = data;
    const servicio = await Servicio.create({ id_servicio: uuidv4(), ...servicioData });

    if (refacciones?.length) {
      const rows = refacciones.map((r) => ({
        id_servicio_refaccion: uuidv4(),
        id_servicio: servicio.id_servicio,
        id_refaccion: r.id_refaccion,
        cantidad: r.cantidad,
      }));
      await ServicioRefaccion.bulkCreate(rows);
    }

    return ServicioRepository.getById(servicio.id_servicio, data.id_empresa);
  },

  getAll: async (id_empresa: string) => {
    return Servicio.findAll({
      where: { id_empresa, activo: true },
      include: [includeRefacciones],
      order: [['nombre', 'ASC']],
    });
  },

  getById: async (id_servicio: string, id_empresa: string) => {
    return Servicio.findOne({
      where: { id_servicio, id_empresa },
      include: [includeRefacciones],
    });
  },

  actualizar: async (id_servicio: string, id_empresa: string, data: IUpdateServicio) => {
    const { refacciones, ...servicioData } = data;
    await Servicio.update(servicioData, { where: { id_servicio, id_empresa } });

    if (refacciones !== undefined) {
      await ServicioRefaccion.destroy({ where: { id_servicio } });
      if (refacciones.length) {
        const rows = refacciones.map((r) => ({
          id_servicio_refaccion: uuidv4(),
          id_servicio,
          id_refaccion: r.id_refaccion,
          cantidad: r.cantidad,
        }));
        await ServicioRefaccion.bulkCreate(rows);
      }
    }

    return ServicioRepository.getById(id_servicio, id_empresa);
  },

  desactivar: async (id_servicio: string, id_empresa: string) => {
    return Servicio.update({ activo: false }, { where: { id_servicio, id_empresa } });
  },
};
