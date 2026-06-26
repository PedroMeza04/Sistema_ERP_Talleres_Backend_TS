import { Router } from 'express';
import { VehiculoController } from '../controllers/VehiculoController';
import { requireCompanyMember } from '../../../middleware/tenant';

const vehiculoRouter = Router();

vehiculoRouter.use(requireCompanyMember);

vehiculoRouter.post('/', VehiculoController.crear);
vehiculoRouter.get('/', VehiculoController.getAll);
vehiculoRouter.get('/cliente/:id_cliente', VehiculoController.getByCliente);
vehiculoRouter.get('/:id', VehiculoController.getById);
vehiculoRouter.put('/:id', VehiculoController.actualizar);
vehiculoRouter.delete('/:id', VehiculoController.desactivar);

export default vehiculoRouter;
