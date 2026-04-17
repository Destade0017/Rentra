import express from 'express';
const router = express.Router();
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.use(protect);
router.use(authorize('landlord'));

router.get('/stats', getDashboardStats);

export default router;
