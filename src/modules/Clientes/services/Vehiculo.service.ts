import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';
import { VehiculoRepository } from '../repositories/VehiculoRepository';

export const VehiculoService = {
  crear: async (data: ICreateVehiculo) => {
    return await VehiculoRepository.crear(data);
  },

  getByCliente: async (id_cliente: string) => {
    return await VehiculoRepository.getByCliente(id_cliente);
  },

  getById: async (id_vehiculo: string) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo);
    if (!vehiculo) throw new Error('Vehículo no encontrado.');
    return vehiculo;
  },

  actualizar: async (id_vehiculo: string, data: IUpdateVehiculo) => {
    await VehiculoService.getById(id_vehiculo);
    return await VehiculoRepository.actualizar(id_vehiculo, data);
  },

  desactivar: async (id_vehiculo: string) => {
    await VehiculoService.getById(id_vehiculo);
    return await VehiculoRepository.desactivar(id_vehiculo);
  }
};
