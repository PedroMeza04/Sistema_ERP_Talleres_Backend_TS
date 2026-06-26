import { OrdenTrabajoRepository } from '../repositories/OrdenTrabajoRepository';
import { ICreateOrden, IUpdateOrden } from '../interface/OrdenTrabajo.interface';

export const OrdenTrabajoService = {
  crear: (data: ICreateOrden) => OrdenTrabajoRepository.crear(data),

  getAll: (id_empresa: string) => OrdenTrabajoRepository.getAll(id_empresa),

  getById: async (id_orden: string, id_empresa: string) => {
    const orden = await OrdenTrabajoRepository.getById(id_orden, id_empresa);
    if (!orden) throw new Error('Orden no encontrada');
    return orden;
  },

  libroVentas: (id_empresa: string, desde?: string, hasta?: string) =>
    OrdenTrabajoRepository.libroVentas(id_empresa, desde, hasta),

  actualizar: async (id_orden: string, id_empresa: string, data: IUpdateOrden) => {
    const orden = await OrdenTrabajoRepository.getById(id_orden, id_empresa);
    if (!orden) throw new Error('Orden no encontrada');
    return OrdenTrabajoRepository.actualizar(id_orden, id_empresa, data);
  },
};
