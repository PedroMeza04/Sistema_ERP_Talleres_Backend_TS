import { ICreateEmpresa, IUpdateEmpresa } from '../interface/Empresa.interface';
import { EmpresaRepository } from '../repositories/EmpresaRepository';

export const EmpresaService = {
  crear: async (data: ICreateEmpresa) => {
    return await EmpresaRepository.crear(data);
  },

  getAll: async () => {
    return await EmpresaRepository.getAll();
  },

  getById: async (id_empresa: string) => {
    const empresa = await EmpresaRepository.getById(id_empresa);
    if (!empresa) throw new Error('Empresa no encontrada.');
    return empresa;
  },

  actualizar: async (id_empresa: string, data: IUpdateEmpresa) => {
    await EmpresaService.getById(id_empresa);
    return await EmpresaRepository.actualizar(id_empresa, data);
  },

  desactivar: async (id_empresa: string) => {
    await EmpresaService.getById(id_empresa);
    return await EmpresaRepository.desactivar(id_empresa);
  }
};
