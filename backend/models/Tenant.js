import mongoose from 'mongoose';

const tenantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a tenant name'],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        unit: {
            type: String,
            required: [true, 'Please add a unit/flat number'],
        },
        rent: {
            type: Number,
            required: [true, 'Please add rent amount'],
        },
        rentStatus: {
            type: String,
            enum: ['paid', 'unpaid', 'overdue', 'part-payment'],
            default: 'unpaid',
        },
        balance: {
            type: Number,
            default: 0,
        },
        leaseStart: {
            type: Date,
        },
        leaseEnd: {
            type: Date,
        },
        nextRentDate: {
            type: Date,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: [true, 'Please assign a property'],
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

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
