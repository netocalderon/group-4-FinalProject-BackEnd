import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import createUserTable from './models/user.js';
import createBookTable from './models/book.js';

// Import routes
import userRoutes from './routes/user.js';
import bookRoutes from './routes/book.js';
import uploadRoute from './routes/upload.js';
// Set port
const PORT = process.env.PORT || 5001

// Construct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express
const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware
app.use(cors());

// Parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create tables
createUserTable();
createBookTable()

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/upload', uploadRoute);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});