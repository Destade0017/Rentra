import Property from '../models/Property.js';
import Tenant from '../models/Tenant.js';
import Complaint from '../models/Complaint.js';
import Payment from '../models/Payment.js';

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Concurrent stats fetching
        const [properties, tenants, complaints, payments] = await Promise.all([
            Property.find({ landlord: userId }),
            Tenant.find({ landlord: userId }),
            Complaint.find({ landlord: userId, status: { $ne: 'resolved' } }),
            Payment.find({ landlord: userId })
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        const occupiedUnits = properties.filter(p => p.status === 'occupied' || p.status === 'rented').length;
        const occupancyRate = properties.length > 0 ? Math.round((occupiedUnits / properties.length) * 100) : 0;

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                propertiesCount: properties.length,
                tenantsCount: tenants.length,
                openComplaints: complaints.length,
                occupancyRate,
                vacantUnits: properties.length - occupiedUnits
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
