import Complaint from '../models/Complaint.js';
import Property from '../models/Property.js';

// @desc    Submit a complaint
// @route   POST /api/complaints
// @access  Private/Tenant or Landlord (for manual entry)
export const submitComplaint = async (req, res, next) => {
    try {
        const { property: propertyId, title, description, category, priority, unit } = req.body;

        // Verify property exists
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        const complaint = await Complaint.create({
            tenant: req.user.role === 'tenant' ? req.user.id : (req.body.tenantId || req.user.id),
            landlord: property.landlord,
            property: propertyId,
            title,
            description,
            category,
            priority,
            unit
        });

        res.status(201).json({
            success: true,
            data: complaint,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get complaints
// @route   GET /api/complaints
// @access  Private
export const getComplaints = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'landlord') {
            query = { landlord: req.user.id };
        } else {
            query = { tenant: req.user.id };
        }

        const complaints = await Complaint.find(query)
            .populate('property', 'name address')
            .populate('tenant', 'name email')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update complaint status or details
// @route   PATCH /api/complaints/:id
// @access  Private
export const updateComplaint = async (req, res, next) => {
    try {
        let complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        // Verify authorized user (landlord or assigned tenant)
        const isLandlord = complaint.landlord.toString() === req.user.id;
        const isTenant = complaint.tenant.toString() === req.user.id;

        if (!isLandlord && !isTenant) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this complaint',
            });
        }

        // Allow updating status, category, etc.
        const updatableFields = ['status', 'priority', 'category', 'description'];
        updatableFields.forEach(field => {
            if (req.body[field]) complaint[field] = req.body[field];
        });

        await complaint.save();

        res.status(200).json({
            success: true,
            data: complaint,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
