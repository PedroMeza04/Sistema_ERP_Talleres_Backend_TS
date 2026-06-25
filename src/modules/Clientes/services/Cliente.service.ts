import { ICreateCliente, IUpdateCliente } from '../interface/Cliente.interface';
import { ClienteRepository } from '../repositories/ClienteRepository';

export const ClienteService = {
  crear: async (data: ICreateCliente) => {
    return await ClienteRepository.crear(data);
  },

  getAll: async (id_empresa: string) => {
    return await ClienteRepository.getAll(id_empresa);
  },

  getById: async (id_cliente: string) => {
    const cliente = await ClienteRepository.getById(id_cliente);
    if (!cliente) throw new Error('Cliente no encontrado.');
    return cliente;
  },

  actualizar: async (id_cliente: string, data: IUpdateCliente) => {
    await ClienteService.getById(id_cliente);
    return await ClienteRepository.actualizar(id_cliente, data);
  },

  desactivar: async (id_cliente: string) => {
    await ClienteService.getById(id_cliente);
    return await ClienteRepository.desactivar(id_cliente);
  }
};
