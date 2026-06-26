import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { requireCompanyMember } from '../../../middleware/tenant';

const clienteRouter = Router();

// Esta línea es nueva: aplica el chequeo de tenant a TODAS las rutas de aquí abajo
// de un solo jalón (necesita el header X-Company-Id + que el usuario sí pertenezca).
clienteRouter.use(requireCompanyMember);

clienteRouter.post('/', ClienteController.crear);
clienteRouter.get('/buscar', ClienteController.buscar);
clienteRouter.get('/empresa/:id_empresa', ClienteController.getAll);
clienteRouter.get('/:id', ClienteController.getById);
clienteRouter.put('/:id', ClienteController.actualizar);
clienteRouter.delete('/:id', ClienteController.desactivar);

export default clienteRouter;
