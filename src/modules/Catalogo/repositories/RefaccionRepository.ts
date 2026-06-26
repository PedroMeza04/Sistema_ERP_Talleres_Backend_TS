import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import Refaccion from '../model/Refaccion';
import { ICreateRefaccion, IUpdateRefaccion } from '../interface/Refaccion.interface';

export const RefaccionRepository = {
  crear: async (data: ICreateRefaccion) => {
    return Refaccion.create({ id_refaccion: uuidv4(), ...data });
  },

  getAll: async (id_empresa: string) => {
    return Refaccion.findAll({
      where: { id_empresa, activo: true },
      order: [['nombre', 'ASC']],
    });
  },

  buscar: async (id_empresa: string, q: string) => {
    return Refaccion.findAll({
      where: {
        id_empresa,
        activo: true,
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${q}%` } },
          { sku: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 10,
      order: [['nombre', 'ASC']],
    });
  },

  getById: async (id_refaccion: string, id_empresa: string) => {
    return Refaccion.findOne({ where: { id_refaccion, id_empresa } });
  },

  actualizar: async (id_refaccion: string, id_empresa: string, data: IUpdateRefaccion) => {
    return Refaccion.update(data, { where: { id_refaccion, id_empresa } });
  },

  desactivar: async (id_refaccion: string, id_empresa: string) => {
    return Refaccion.update({ activo: false }, { where: { id_refaccion, id_empresa } });
  },
};
