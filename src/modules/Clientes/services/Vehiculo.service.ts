import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';
import { VehiculoRepository } from '../repositories/VehiculoRepository';
import { ClienteService } from './Cliente.service';

export const VehiculoService = {
  // El await ClienteService.getById(...) de aquí es la parte clave: antes de crear el
  // vehículo, confirmamos que el id_cliente que llega de verdad pertenece a esta
  // empresa. Si no, getById lanza "Cliente no encontrado" y no se crea nada — así
  // alguien no puede colgar un vehículo a un cliente de otra empresa.
  crear: async (data: ICreateVehiculo, id_empresa: string) => {
    await ClienteService.getById(data.id_cliente, id_empresa);
    return await VehiculoRepository.crear(data);
  },

  // getAll es nuevo, para el listado global de vehículos de la empresa.
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
