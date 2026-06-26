import { Router } from 'express';
import { RefaccionController } from '../controllers/RefaccionController';
import { requireCompanyMember } from '../../../middleware/tenant';

const refaccionRouter = Router();

refaccionRouter.use(requireCompanyMember);

refaccionRouter.post('/', RefaccionController.crear);
refaccionRouter.get('/', RefaccionController.getAll);
refaccionRouter.get('/buscar', RefaccionController.buscar);
refaccionRouter.get('/:id', RefaccionController.getById);
refaccionRouter.put('/:id', RefaccionController.actualizar);
refaccionRouter.delete('/:id', RefaccionController.desactivar);

export default refaccionRouter;
