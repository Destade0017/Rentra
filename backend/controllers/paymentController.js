import Payment from '../models/Payment.js';
import Property from '../models/Property.js';
import User from '../models/User.js';

// @desc    Record a new payment
// @route   POST /api/payments
// @access  Private (Landlord)
export const recordPayment = async (req, res) => {
    try {
        const { tenantId, propertyId, amount, method, paymentDate, dueDate, notes } = req.body;

        // Verify property belongs to landlord
        const property = await Property.findOne({ _id: propertyId, landlord: req.user.id });
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found or unauthorized' });
        }

        const payment = await Payment.create({
            landlord: req.user.id,
            tenant: tenantId,
            property: propertyId,
            amount,
            method,
            paymentDate: paymentDate || Date.now(),
            dueDate,
            notes,
        });

        res.status(201).json({
            success: true,
            data: payment,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all payments for landlord
// @route   GET /api/payments
// @access  Private (Landlord)
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ landlord: req.user.id })
            .populate('tenant', 'name email')
            .populate('property', 'name address')
            .sort('-paymentDate');

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get analytics summary
// @route   GET /api/payments/stats/summary
// @access  Private (Landlord)
export const getPaymentStats = async (req, res) => {
    try {
        const stats = await Payment.aggregate([
            { $match: { landlord: req.user._id } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats[0] || { totalRevenue: 0, count: 0 }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// @desc    Get payments for a specific tenant
// @route   GET /api/payments/tenant/:tenantId
// @access  Private (Landlord)
export const getTenantPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ 
            landlord: req.user.id, 
            tenant: req.params.tenantId 
        })
        .sort('-paymentDate');

        res.status(200).json({
            success: true,
            count: payments.length,
            data: payments,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
