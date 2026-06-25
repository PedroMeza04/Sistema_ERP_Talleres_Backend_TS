import { v4 as uuidv4 } from 'uuid';
import Cliente from '../model/Cliente';
import Vehiculo from '../model/Vehiculo';
import { ICreateCliente, IUpdateCliente } from '../interface/Cliente.interface';

export const ClienteRepository = {
  crear: async (data: ICreateCliente) => {
    return await Cliente.create({ id_cliente: uuidv4(), ...data });
  },

  getAll: async (id_empresa: string) => {
    return await Cliente.findAll({
      where: { id_empresa, activo: true },
      attributes: ['id_cliente', 'nombre', 'apellido_pat', 'apellido_mat', 'telefono', 'email'],
      include: [{ model: Vehiculo, attributes: ['id_vehiculo', 'marca', 'modelo', 'anio', 'placa'], where: { activo: true }, required: false }]
    });
  },

  getById: async (id_cliente: string) => {
    return await Cliente.findOne({
      where: { id_cliente },
      include: [{ model: Vehiculo, where: { activo: true }, required: false }]
    });
  },

  actualizar: async (id_cliente: string, data: IUpdateCliente) => {
    return await Cliente.update(data, { where: { id_cliente } });
  },

  desactivar: async (id_cliente: string) => {
    return await Cliente.update({ activo: false }, { where: { id_cliente } });
  }
};
