import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { requireCompanyMember } from '../../../middleware/tenant';

const clienteRouter = Router();

clienteRouter.use(requireCompanyMember);

clienteRouter.post('/', ClienteController.crear);
clienteRouter.get('/empresa/:id_empresa', ClienteController.getAll);
clienteRouter.get('/:id', ClienteController.getById);
clienteRouter.put('/:id', ClienteController.actualizar);
clienteRouter.delete('/:id', ClienteController.desactivar);

export default clienteRouter;
