import express from 'express';
const router = express.Router();
import {
    createProperty,
    getProperties,
    updateProperty,
    deleteProperty,
} from '../controllers/propertyController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

router.use(protect);
router.use(authorize('landlord'));

router
    .route('/')
    .get(getProperties)
    .post(createProperty);

router
    .route('/:id')
    .put(updateProperty)
    .delete(deleteProperty);

export default router;
