import { Router } from 'express';
import { EmpresaController } from '../controllers/EmpresaController';

const empresaRouter = Router();

empresaRouter.post('/', EmpresaController.crear);
empresaRouter.get('/', EmpresaController.getAll);
empresaRouter.get('/:id', EmpresaController.getById);
empresaRouter.put('/:id', EmpresaController.actualizar);
empresaRouter.delete('/:id', EmpresaController.desactivar);

export default empresaRouter;
