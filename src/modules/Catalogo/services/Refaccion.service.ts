import { ICreateRefaccion, IUpdateRefaccion } from '../interface/Refaccion.interface';
import { RefaccionRepository } from '../repositories/RefaccionRepository';

export const RefaccionService = {
  crear: async (data: ICreateRefaccion) => RefaccionRepository.crear(data),

  getAll: async (id_empresa: string) => RefaccionRepository.getAll(id_empresa),

  buscar: async (id_empresa: string, q: string) => RefaccionRepository.buscar(id_empresa, q),

  getById: async (id_refaccion: string, id_empresa: string) => {
    const r = await RefaccionRepository.getById(id_refaccion, id_empresa);
    if (!r) throw new Error('Refacción no encontrada');
    return r;
  },

  actualizar: async (id_refaccion: string, id_empresa: string, data: IUpdateRefaccion) => {
    await RefaccionService.getById(id_refaccion, id_empresa);
    return RefaccionRepository.actualizar(id_refaccion, id_empresa, data);
  },

  desactivar: async (id_refaccion: string, id_empresa: string) => {
    await RefaccionService.getById(id_refaccion, id_empresa);
    return RefaccionRepository.desactivar(id_refaccion, id_empresa);
  },
};
