// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// ✅ All booking routes require authentication
router.use(protect); // This applies protect middleware to all routes in this file

// Create booking - requires login
router.post('/create', async (req, res) => {
  try {
    const { movieId, date, time, tickets, seatNumbers } = req.body;
    
    // Validate required fields
    if (!movieId || !date || !time || !tickets) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Here you would typically save to database
    // For now, just return success response
    const booking = {
      id: Date.now(), // temporary ID
      userId: req.user.id,
      movieId,
      date,
      time,
      tickets,
      seatNumbers: seatNumbers || [],
      status: 'confirmed',
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      booking,
      user: req.user
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// Get user's bookings
router.get('/my-bookings', async (req, res) => {
  try {
    // Here you would fetch from database
    // For now, return dummy data
    const bookings = [
      {
        id: 1,
        movieTitle: 'Avatar: The Way of Water',
        date: '2025-08-15',
        time: '7:00 PM',
        tickets: 2,
        status: 'confirmed'
      }
    ];

    res.status(200).json({
      success: true,
      bookings,
      user: req.user
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // Here you would delete from database
    // For now, just return success response
    
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

module.exports = router;