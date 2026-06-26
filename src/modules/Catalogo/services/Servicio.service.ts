import { ICreateServicio, IUpdateServicio } from '../interface/Servicio.interface';
import { ServicioRepository } from '../repositories/ServicioRepository';

export const ServicioService = {
  crear: async (data: ICreateServicio) => ServicioRepository.crear(data),

  getAll: async (id_empresa: string) => ServicioRepository.getAll(id_empresa),

  getById: async (id_servicio: string, id_empresa: string) => {
    const s = await ServicioRepository.getById(id_servicio, id_empresa);
    if (!s) throw new Error('Servicio no encontrado');
    return s;
  },

  actualizar: async (id_servicio: string, id_empresa: string, data: IUpdateServicio) => {
    await ServicioService.getById(id_servicio, id_empresa);
    return ServicioRepository.actualizar(id_servicio, id_empresa, data);
  },

  desactivar: async (id_servicio: string, id_empresa: string) => {
    await ServicioService.getById(id_servicio, id_empresa);
    return ServicioRepository.desactivar(id_servicio, id_empresa);
  },
};
