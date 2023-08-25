const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'N/A',
  },
  arrival: {
    type: Date,
    default: Date.now,
  },
});

module.exports = destinationSchema;