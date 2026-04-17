import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middleware/errorMiddleware.js';

// Route files
import auth from './routes/authRoutes.js';
import properties from './routes/propertyRoutes.js';
import tenants from './routes/tenantRoutes.js';
import complaints from './routes/complaintRoutes.js';
import payments from './routes/paymentRoutes.js';
import dashboard from './routes/dashboardRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/properties', properties);
app.use('/api/tenants', tenants);
app.use('/api/complaints', complaints);
app.use('/api/payments', payments);
app.use('/api/dashboard', dashboard);

// Error handler
app.use(errorHandler);

export default app;
