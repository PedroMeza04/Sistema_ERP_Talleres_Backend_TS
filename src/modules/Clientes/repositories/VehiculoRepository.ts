import { v4 as uuidv4 } from 'uuid';
import Vehiculo from '../model/Vehiculo';
import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';

export const VehiculoRepository = {
  crear: async (data: ICreateVehiculo) => {
    return await Vehiculo.create({ id_vehiculo: uuidv4(), ...data });
  },

  getByCliente: async (id_cliente: string) => {
    return await Vehiculo.findAll({
      where: { id_cliente, activo: true }
    });
  },

  getById: async (id_vehiculo: string) => {
    return await Vehiculo.findOne({ where: { id_vehiculo } });
  },

  actualizar: async (id_vehiculo: string, data: IUpdateVehiculo) => {
    return await Vehiculo.update(data, { where: { id_vehiculo } });
  },

  desactivar: async (id_vehiculo: string) => {
    return await Vehiculo.update({ activo: false }, { where: { id_vehiculo } });
  }
};
