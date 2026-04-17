import Property from '../models/Property.js';

// @desc    Create new property
// @route   POST /api/properties
// @access  Private/Landlord
export const createProperty = async (req, res, next) => {
    try {
        req.body.landlord = req.user.id;

        const property = await Property.create(req.body);

        res.status(201).json({
            success: true,
            data: property,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all properties (for the logged in landlord)
// @route   GET /api/properties
// @access  Private/Landlord
export const getProperties = async (req, res, next) => {
    try {
        const properties = await Property.find({ landlord: req.user.id });

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Landlord
export const updateProperty = async (req, res, next) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        if (property.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this property`,
            });
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: property,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Landlord
export const deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        if (property.landlord.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this property`,
            });
        }

        await property.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
