import mongoose from 'mongoose';

const propertySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a property name'],
            trim: true,
        },
        address: {
            type: String,
            required: [true, 'Please add an address'],
        },
        type: {
            type: String,
            enum: ['Apartment', 'House', 'Office Space', 'Warehouse', 'Shop / Retail'],
            default: 'Apartment',
        },
        description: {
            type: String,
            default: 'Premium rental property managed via RentFlow',
        },
        rent: {
            type: Number,
            required: [true, 'Please add rent amount'],
        },
        status: {
            type: String,
            enum: ['available', 'rented', 'maintenance', 'vacant', 'occupied'],
            default: 'vacant',
        },
        landlord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model('Property', propertySchema);
export default Property;
