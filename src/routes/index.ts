import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import authRouter from '../modules/Usuarios/routes/AuthRouter';
import empresaRouter from '../modules/Empresas/routes/empresaRouter';
import usuarioEmpresaRouter from '../modules/Usuarios/routes/UsuarioEmpresaRouter';
import clienteRouter from '../modules/Clientes/routes/clienteRouter';
import vehiculoRouter from '../modules/Clientes/routes/vehiculoRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/empresas', authMiddleware, empresaRouter);
router.use('/usuario-empresas', authMiddleware, usuarioEmpresaRouter);
router.use('/clientes', authMiddleware, clienteRouter);
router.use('/vehiculos', authMiddleware, vehiculoRouter);

export default router;
