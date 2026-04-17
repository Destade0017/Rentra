import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token with user ID and role
 * @param {string} id - User ID from MongoDB
 * @param {string} role - User role (landlord/tenant)
 * @returns {string} - Signed JWT
 */
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};

export default generateToken;
