import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import Cliente from '../model/Cliente';
import Vehiculo from '../model/Vehiculo';
import { ICreateCliente, IUpdateCliente } from '../interface/Cliente.interface';

export const ClienteRepository = {
  crear: async (data: ICreateCliente) => {
    const { vehicles, ...clienteData } = data;

    const cliente = await Cliente.create({ id_cliente: uuidv4(), ...clienteData });

    if (vehicles && vehicles.length > 0) {
      const vehiculosData = vehicles.map((v) => ({
        id_vehiculo: uuidv4(),
        id_cliente: cliente.id_cliente,
        marca: v.brand,
        modelo: v.model,
        anio: v.year ?? null,
        placa: v.plate,
        numero_serie: v.vin ?? null,
        kilometraje: v.mileage != null ? String(v.mileage) : null,
      }));
      await Vehiculo.bulkCreate(vehiculosData);
    }

    return await Cliente.findOne({
      where: { id_cliente: cliente.id_cliente },
      include: [{ model: Vehiculo, where: { activo: true }, required: false }],
    });
  },

  getAll: async (id_empresa: string) => {
    return await Cliente.findAll({
      where: { id_empresa, activo: true },
      include: [{ model: Vehiculo, attributes: ['id_vehiculo', 'marca', 'modelo', 'anio', 'placa'], where: { activo: true }, required: false }],
      order: [['createdAt', 'DESC']],
    });
  },

  // getById, actualizar y desactivar ahora reciben id_empresa y lo agregan al where.
  // Antes solo filtraban por id_cliente, así que un usuario de la Empresa A podía
  // leer/editar/desactivar un cliente de la Empresa B nomás adivinando o conociendo
  // su id. El id_empresa que llega aquí ya viene verificado desde el controller
  // (req.empresaId, puesto por el middleware de tenant), no hay que volver a validarlo.
  getById: async (id_cliente: string, id_empresa: string) => {
    return await Cliente.findOne({
      where: { id_cliente, id_empresa },
      include: [{ model: Vehiculo, where: { activo: true }, required: false }],
    });
  },

  actualizar: async (id_cliente: string, id_empresa: string, data: IUpdateCliente) => {
    return await Cliente.update(data, { where: { id_cliente, id_empresa } });
  },

  desactivar: async (id_cliente: string, id_empresa: string) => {
    return await Cliente.update({ activo: false }, { where: { id_cliente, id_empresa } });
  },

  buscar: async (id_empresa: string, q: string) => {
    return Cliente.findAll({
      where: {
        id_empresa,
        activo: true,
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${q}%` } },
          { telefono: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: [{ model: Vehiculo, attributes: ['id_vehiculo', 'marca', 'modelo', 'anio', 'placa'], where: { activo: true }, required: false }],
      limit: 10,
    });
  },
};
