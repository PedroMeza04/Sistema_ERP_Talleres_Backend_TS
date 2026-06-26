import { Router } from 'express';
import { ServicioController } from '../controllers/ServicioController';
import { requireCompanyMember } from '../../../middleware/tenant';

const servicioRouter = Router();

servicioRouter.use(requireCompanyMember);

servicioRouter.post('/', ServicioController.crear);
servicioRouter.get('/', ServicioController.getAll);
servicioRouter.get('/:id', ServicioController.getById);
servicioRouter.put('/:id', ServicioController.actualizar);
servicioRouter.delete('/:id', ServicioController.desactivar);

export default servicioRouter;
