import { Router } from 'express';
import { OrdenTrabajoController } from '../controllers/OrdenTrabajoController';
import { requireCompanyMember } from '../../../middleware/tenant';

const ordenTrabajoRouter = Router();

ordenTrabajoRouter.use(requireCompanyMember);

ordenTrabajoRouter.post('/', OrdenTrabajoController.crear);
ordenTrabajoRouter.get('/', OrdenTrabajoController.getAll);
ordenTrabajoRouter.get('/libro-ventas', OrdenTrabajoController.libroVentas);
ordenTrabajoRouter.get('/:id', OrdenTrabajoController.getById);
ordenTrabajoRouter.put('/:id', OrdenTrabajoController.actualizar);

export default ordenTrabajoRouter;
