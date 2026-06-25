import { Router } from 'express';
import { UsuarioEmpresaController } from '../controllers/UsuarioEmpresaController';

const usuarioEmpresaRouter = Router();

usuarioEmpresaRouter.post('/', UsuarioEmpresaController.asignar);
usuarioEmpresaRouter.get('/usuario/:id_usuario', UsuarioEmpresaController.getEmpresasPorUsuario);
usuarioEmpresaRouter.get('/empresa/:id_empresa', UsuarioEmpresaController.getUsuariosPorEmpresa);
usuarioEmpresaRouter.put('/:id', UsuarioEmpresaController.actualizarAcceso);
usuarioEmpresaRouter.delete('/:id', UsuarioEmpresaController.revocar);

export default usuarioEmpresaRouter;
