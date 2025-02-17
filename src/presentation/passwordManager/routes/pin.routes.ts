import { Router } from 'express';
import { PinController } from '../controllers/pin.controller';

const router = Router();

router.post('/validate', PinController.validatePin);

export default router;
