import express from 'express';
const router = express.Router();
import {
    addTenant,
    getTenants,
    getTenant,
    updateTenant,
    deleteTenant,
} from '../controllers/tenantController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

router.use(protect);
router.use(authorize('landlord'));

router
    .route('/')
    .get(getTenants)
    .post(addTenant);

router
    .route('/:id')
    .get(getTenant)
    .put(updateTenant)
    .delete(deleteTenant);

export default router;
