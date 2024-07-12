import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoute from '../routes/user.js'
import authRoute from '../routes/auth.js'

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the absolute path to the .env file
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const username = process.env.DBUSER;
const password = process.env.DBPASS;

// Check if DB, username, and password are loaded correctly
if (!process.env.DB || !username || !password) {
    console.error("Environment variables are not loaded correctly. Please check your .env file.");
    process.exit(1); // Exit the application if environment variables are not loaded
}

const database = process.env.DB.replace('<username>', username).replace('<password>', encodeURIComponent(password));

mongoose.connect(database).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Not Connected to MongoDB", err);
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3030;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/v1/', userRoute);
app.use('/api/v1/auth', authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,  
    });
})