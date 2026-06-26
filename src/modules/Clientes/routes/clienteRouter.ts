import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { requireCompanyMember } from '../../../middleware/tenant';

const clienteRouter = Router();

// Esta línea es nueva: aplica el chequeo de tenant a TODAS las rutas de aquí abajo
// de un solo jalón (necesita el header X-Company-Id + que el usuario sí pertenezca).
clienteRouter.use(requireCompanyMember);

clienteRouter.post('/', ClienteController.crear);
// Ojo: aunque la ruta sigue recibiendo :id_empresa en la URL, el controller ya no lo
// usa — ahora usa req.empresaId (el verificado por el middleware de arriba). El
// parámetro de la URL quedó ahí por compatibilidad, pero no hace nada.
clienteRouter.get('/empresa/:id_empresa', ClienteController.getAll);
clienteRouter.get('/:id', ClienteController.getById);
clienteRouter.put('/:id', ClienteController.actualizar);
clienteRouter.delete('/:id', ClienteController.desactivar);

export default clienteRouter;
