import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';
import { VehiculoRepository } from '../repositories/VehiculoRepository';
import { ClienteService } from './Cliente.service';

export const VehiculoService = {
  crear: async (data: ICreateVehiculo, id_empresa: string) => {
    await ClienteService.getById(data.id_cliente, id_empresa);
    return await VehiculoRepository.crear(data);
  },

  getAll: async (id_empresa: string) => {
    return await VehiculoRepository.getAll(id_empresa);
  },

  getByCliente: async (id_cliente: string, id_empresa: string) => {
    return await VehiculoRepository.getByCliente(id_cliente, id_empresa);
  },

  getById: async (id_vehiculo: string, id_empresa: string) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo, id_empresa);
    if (!vehiculo) throw new Error('Vehículo no encontrado.');
    return vehiculo;
  },

  actualizar: async (id_vehiculo: string, id_empresa: string, data: IUpdateVehiculo) => {
    await VehiculoService.getById(id_vehiculo, id_empresa);
    return await VehiculoRepository.actualizar(id_vehiculo, id_empresa, data);
  },

  desactivar: async (id_vehiculo: string, id_empresa: string) => {
    await VehiculoService.getById(id_vehiculo, id_empresa);
    return await VehiculoRepository.desactivar(id_vehiculo, id_empresa);
  }
};
