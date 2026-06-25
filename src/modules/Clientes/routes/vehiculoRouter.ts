import { Router } from 'express';
import { VehiculoController } from '../controllers/VehiculoController';

const vehiculoRouter = Router();

vehiculoRouter.post('/', VehiculoController.crear);
vehiculoRouter.get('/cliente/:id_cliente', VehiculoController.getByCliente);
vehiculoRouter.get('/:id', VehiculoController.getById);
vehiculoRouter.put('/:id', VehiculoController.actualizar);
vehiculoRouter.delete('/:id', VehiculoController.desactivar);

export default vehiculoRouter;
