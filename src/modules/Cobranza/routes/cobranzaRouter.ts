import { Router } from 'express';
import { CuentaPorCobrarController } from '../controllers/CuentaPorCobrarController';
import { requireCompanyMember } from '../../../middleware/tenant';

const cobranzaRouter = Router();

cobranzaRouter.use(requireCompanyMember);

cobranzaRouter.post('/', CuentaPorCobrarController.crear);
cobranzaRouter.get('/', CuentaPorCobrarController.getAll);
cobranzaRouter.get('/:id', CuentaPorCobrarController.getById);
cobranzaRouter.post('/:id/pagos', CuentaPorCobrarController.agregarPago);

export default cobranzaRouter;
