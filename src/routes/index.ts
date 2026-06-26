import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import authRouter from '../modules/Usuarios/routes/AuthRouter';
import empresaRouter from '../modules/Empresas/routes/empresaRouter';
import usuarioEmpresaRouter from '../modules/Usuarios/routes/UsuarioEmpresaRouter';
import clienteRouter from '../modules/Clientes/routes/clienteRouter';
import vehiculoRouter from '../modules/Clientes/routes/vehiculoRouter';
import servicioRouter from '../modules/Catalogo/routes/servicioRouter';
import refaccionRouter from '../modules/Catalogo/routes/refaccionRouter';
import ordenTrabajoRouter from '../modules/OrdenTrabajo/routes/ordenTrabajoRouter';
import cobranzaRouter from '../modules/Cobranza/routes/cobranzaRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/empresas',        authMiddleware, empresaRouter);
router.use('/usuario-empresas', authMiddleware, usuarioEmpresaRouter);
router.use('/clientes',        authMiddleware, clienteRouter);
router.use('/vehiculos',       authMiddleware, vehiculoRouter);
router.use('/servicios',       authMiddleware, servicioRouter);
router.use('/refacciones',     authMiddleware, refaccionRouter);
router.use('/ordenes',         authMiddleware, ordenTrabajoRouter);
router.use('/cuentas-cobrar',  authMiddleware, cobranzaRouter);

export default router;
