import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../../../middleware/auth';
import { requireCompanyAdmin } from '../../../middleware/tenant';
import { authLimiter } from '../../../config/limiter';
const router = Router();

router.get('/', authMiddleware, requireCompanyAdmin, AuthController.getAll);
router.post('/crearUsuario', authMiddleware, requireCompanyAdmin, AuthController.createUsuario);
router.post('/iniciarSesion', authLimiter, AuthController.iniciarSesion);
//router.patch('/cambiarContrasena/:usuarioweb', AuthController.cambiarContrasena);
//router.get('/user', AuthController.user);
export default router;
