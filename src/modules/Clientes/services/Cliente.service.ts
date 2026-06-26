import { ICreateCliente, IUpdateCliente } from '../interface/Cliente.interface';
import { ClienteRepository } from '../repositories/ClienteRepository';

// id_empresa ahora viaja por todos los métodos (getById, actualizar, desactivar) y se
// lo pasa tal cual al repository, que es quien realmente filtra con él en el where.
export const ClienteService = {
  crear: async (data: ICreateCliente) => {
    return await ClienteRepository.crear(data);
  },

  getAll: async (id_empresa: string) => {
    return await ClienteRepository.getAll(id_empresa);
  },

  getById: async (id_cliente: string, id_empresa: string) => {
    const cliente = await ClienteRepository.getById(id_cliente, id_empresa);
    if (!cliente) throw new Error('Cliente no encontrado.');
    return cliente;
  },

  actualizar: async (id_cliente: string, id_empresa: string, data: IUpdateCliente) => {
    await ClienteService.getById(id_cliente, id_empresa);
    return await ClienteRepository.actualizar(id_cliente, id_empresa, data);
  },

  desactivar: async (id_cliente: string, id_empresa: string) => {
    await ClienteService.getById(id_cliente, id_empresa);
    return await ClienteRepository.desactivar(id_cliente, id_empresa);
  },

  buscar: (id_empresa: string, q: string) => ClienteRepository.buscar(id_empresa, q),
};
