import { v4 as uuidv4 } from 'uuid';
import Vehiculo from '../model/Vehiculo';
import Cliente from '../model/Cliente';
import { ICreateVehiculo, IUpdateVehiculo } from '../interface/Vehiculo.interface';

export const VehiculoRepository = {
  crear: async (data: ICreateVehiculo) => {
    return await Vehiculo.create({ id_vehiculo: uuidv4(), ...data });
  },

  // getAll es nuevo del todo — antes no había forma de listar TODOS los vehículos de
  // la empresa de un jalón, solo por cliente. Como Vehiculo no tiene id_empresa
  // directo, hacemos join con Cliente y filtramos ahí (where va dentro del include).
  getAll: async (id_empresa: string) => {
    return await Vehiculo.findAll({
      where: { activo: true },
      include: [{ model: Cliente, where: { id_empresa }, attributes: ['id_cliente', 'nombre'] }],
      order: [['createdAt', 'DESC']],
    });
  },

  // Mismo razonamiento que en ClienteRepository: antes estos tres no validaban
  // empresa para nada, así que cualquiera podía leer/editar/desactivar el vehículo de
  // otra empresa solo con el id. Ahora todos pasan por el join con Cliente.
  getByCliente: async (id_cliente: string, id_empresa: string) => {
    return await Vehiculo.findAll({
      where: { id_cliente, activo: true },
      include: [{ model: Cliente, where: { id_empresa }, attributes: [] }],
    });
  },

  getById: async (id_vehiculo: string, id_empresa: string) => {
    return await Vehiculo.findOne({
      where: { id_vehiculo },
      include: [{ model: Cliente, where: { id_empresa }, attributes: ['id_cliente', 'nombre'] }],
    });
  },

  // actualizar/desactivar reusan getById (ya scoped por empresa) como guardia: si no
  // encuentra el vehículo en ESA empresa, no actualiza nada y regresa null. Así no
  // hace falta repetir el join de nuevo solo para validar antes del update.
  actualizar: async (id_vehiculo: string, id_empresa: string, data: IUpdateVehiculo) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo, id_empresa);
    if (!vehiculo) return null;
    return await Vehiculo.update(data, { where: { id_vehiculo } });
  },

  desactivar: async (id_vehiculo: string, id_empresa: string) => {
    const vehiculo = await VehiculoRepository.getById(id_vehiculo, id_empresa);
    if (!vehiculo) return null;
    return await Vehiculo.update({ activo: false }, { where: { id_vehiculo } });
  }
};
