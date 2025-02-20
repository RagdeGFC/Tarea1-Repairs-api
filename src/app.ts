import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
const cors = require('cors');

// Import routes
import userRoutes from './routes/user.routes';
import passwordRoutes from './routes/password.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
export const AppDataSource = new DataSource({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: ['src/entities/*.ts'],
});

// Database connection
AppDataSource.initialize()
	.then(() => {
		console.log('✅ Successfully connected to the database!');
	})
	.catch((error) => {
		console.error('❌ Error connecting to the database:', error);
	});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/passwords', passwordRoutes);

// Start server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
	console.log(`✅ Server running on port ${PORT}`);
});
