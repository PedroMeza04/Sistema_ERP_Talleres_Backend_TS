import { v4 as uuidv4 } from 'uuid';
import Empresa from '../model/Empresa';
import { ICreateEmpresa, IUpdateEmpresa } from '../interface/Empresa.interface';

export const EmpresaRepository = {
  crear: async (data: ICreateEmpresa) => {
    return await Empresa.create({ id_empresa: uuidv4(), ...data });
  },

  getAll: async () => {
    return await Empresa.findAll({
      where: { activo: true },
      attributes: ['id_empresa', 'nombre_empresa', 'rfc', 'ciudad', 'estado', 'telefono', 'email']
    });
  },

  getById: async (id_empresa: string) => {
    return await Empresa.findOne({ where: { id_empresa } });
  },

  actualizar: async (id_empresa: string, data: IUpdateEmpresa) => {
    return await Empresa.update(data, { where: { id_empresa } });
  },

  desactivar: async (id_empresa: string) => {
    return await Empresa.update({ activo: false }, { where: { id_empresa } });
  }
};
