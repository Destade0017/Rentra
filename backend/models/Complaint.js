import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        landlord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            enum: ['Plumbing', 'Electrical', 'HVAC', 'General', 'Technical', 'Repair'],
            default: 'General',
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Urgent'],
            default: 'Medium',
        },
        status: {
            type: String,
            enum: ['new', 'in_progress', 'waiting', 'resolved'],
            default: 'new',
        },
        unit: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
