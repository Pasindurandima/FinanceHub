require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/bookings', bookingRoutes);
