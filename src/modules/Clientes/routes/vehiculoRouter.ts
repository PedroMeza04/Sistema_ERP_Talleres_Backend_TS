import { Router } from 'express';
import { VehiculoController } from '../controllers/VehiculoController';
import { requireCompanyMember } from '../../../middleware/tenant';

const vehiculoRouter = Router();

// Igual que en clienteRouter: valida tenant para todas las rutas de aquí abajo.
vehiculoRouter.use(requireCompanyMember);

vehiculoRouter.post('/', VehiculoController.crear);
// GET '/' es la ruta nueva: antes no existía manera de pedir "todos los vehículos de
// la empresa" sin pasar por un cliente — esto es lo que usa la pantalla de
// Vehículos del frontend, que es una vista independiente de la de Clientes.
vehiculoRouter.get('/', VehiculoController.getAll);
vehiculoRouter.get('/cliente/:id_cliente', VehiculoController.getByCliente);
vehiculoRouter.get('/:id', VehiculoController.getById);
vehiculoRouter.put('/:id', VehiculoController.actualizar);
vehiculoRouter.delete('/:id', VehiculoController.desactivar);

export default vehiculoRouter;
