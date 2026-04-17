import express from 'express';
const router = express.Router();
import {
    submitComplaint,
    getComplaints,
    updateComplaint,
} from '../controllers/complaintController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

router.use(protect);

router
    .route('/')
    .get(getComplaints)
    .post(submitComplaint); // Allow both for manual logging or tenant submissions

router
    .route('/:id')
    .patch(updateComplaint); // Both can update (authorization handled in controller)

export default router;
