import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema(
    {
        landlord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant',
            required: true,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        amount: {
            type: Number,
            required: [true, 'Please add a payment amount'],
        },
        method: {
            type: String,
            required: [true, 'Please add a payment method'],
            enum: ['Bank Transfer', 'Card Payment', 'Cash', 'Cheque'],
        },
        status: {
            type: String,
            enum: ['Paid', 'Pending', 'Overdue'],
            default: 'Paid',
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
