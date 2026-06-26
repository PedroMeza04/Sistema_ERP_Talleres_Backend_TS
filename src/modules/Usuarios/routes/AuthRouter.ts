import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../../../middleware/auth';
import { requireCompanyAdmin } from '../../../middleware/tenant';
import { authLimiter } from '../../../config/limiter';
const router = Router();

// Antes estas dos rutas no tenían ningún middleware — cualquiera sin loguearse podía
// listar todos los usuarios o crear uno nuevo. Ahora exigen estar logueado
// (authMiddleware) y ser admin de la empresa (requireCompanyAdmin).
router.get('/', authMiddleware, requireCompanyAdmin, AuthController.getAll);
router.post('/crearUsuario', authMiddleware, requireCompanyAdmin, AuthController.createUsuario);
// authLimiter ya existía pero no estaba conectado a ningún lado — esto frena los
// intentos de fuerza bruta sobre el login.
router.post('/iniciarSesion', authLimiter, AuthController.iniciarSesion);
//router.patch('/cambiarContrasena/:usuarioweb', AuthController.cambiarContrasena);
//router.get('/user', AuthController.user);
export default router;
