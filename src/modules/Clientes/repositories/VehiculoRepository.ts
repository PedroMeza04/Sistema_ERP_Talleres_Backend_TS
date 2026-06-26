import { v4 as uuidv4 } from 'uuid';
import Vehiculo from '../model/Vehiculo';
import Cliente from '../model/Cliente';
import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';

export const VehiculoRepository = {
  crear: async (data: ICreateVehiculo) => {
    return await Vehiculo.create({ id_vehiculo: uuidv4(), ...data });
  },

  getAll: async (id_empresa: string) => {
    return await Vehiculo.findAll({
      where: { activo: true },
      include: [{ model: Cliente, where: { id_empresa }, attributes: ['id_cliente', 'nombre'] }],
      order: [['createdAt', 'DESC']],
    });
  },

  getByCliente: async (id_cliente: string, id_empresa: string) => {
    return await Vehiculo.findAll({
      where: { id_cliente, activo: true },
      include: [{ model: Cliente, where: { id_empresa }, attributes: [] }],
    });
  },

  getById: async (id_vehiculo: string, id_empresa: string) => {
    return await Vehiculo.findOne({
      where: { id_vehiculo },
      include: [{ model: Cliente, where: { id_empresa }, attributes: ['id_cliente', 'nombre'] }],
    });
  },

  actualizar: async (id_vehiculo: string, id_empresa: string, data: IUpdateVehiculo) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo, id_empresa);
    if (!vehiculo) return null;
    return await Vehiculo.update(data, { where: { id_vehiculo } });
  },

  desactivar: async (id_vehiculo: string, id_empresa: string) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo, id_empresa);
    if (!vehiculo) return null;
    return await Vehiculo.update({ activo: false }, { where: { id_vehiculo } });
  }
};
