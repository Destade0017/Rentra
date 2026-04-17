import Tenant from '../models/Tenant.js';
import Property from '../models/Property.js';

// @desc    Add new tenant
// @route   POST /api/tenants
// @access  Private/Landlord
export const addTenant = async (req, res, next) => {
    try {
        const { propertyId, name, email, phone, rent, unit, dueDate, leaseStart, leaseEnd } = req.body;

        // Verify property exists and belongs to this landlord
        const property = await Property.findById(propertyId || req.body.property);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        if (property.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to assign tenants to this property',
            });
        }

        const tenant = await Tenant.create({
            name,
            email,
            phone,
            rent,
            unit,
            dueDate,
            leaseStart,
            leaseEnd,
            property: propertyId || req.body.property,
            landlord: req.user.id
        });

        // Update property status
        property.status = 'occupied';
        await property.save();

        res.status(201).json({
            success: true,
            data: tenant,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all tenants for the logged in landlord
// @route   GET /api/tenants
// @access  Private/Landlord
export const getTenants = async (req, res, next) => {
    try {
        const tenants = await Tenant.find({ landlord: req.user.id })
            .populate('property', 'name address')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: tenants.length,
            data: tenants,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get single tenant
// @route   GET /api/tenants/:id
// @access  Private/Landlord
export const getTenant = async (req, res, next) => {
    try {
        const tenant = await Tenant.findById(req.params.id).populate('property', 'name address');

        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        if (tenant.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this tenant',
            });
        }

        res.status(200).json({
            success: true,
            data: tenant,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update tenant details
// @route   PUT /api/tenants/:id
// @access  Private/Landlord
export const updateTenant = async (req, res, next) => {
    try {
        let tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        if (tenant.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this tenant',
            });
        }

        tenant = await Tenant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: tenant,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete tenant
// @route   DELETE /api/tenants/:id
// @access  Private/Landlord
export const deleteTenant = async (req, res, next) => {
    try {
        const tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ success: false, message: 'Tenant not found' });
        }

        if (tenant.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this tenant',
            });
        }

        // Reset property status
        const property = await Property.findById(tenant.property);
        if (property) {
            property.status = 'vacant';
            await property.save();
        }

        await tenant.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
