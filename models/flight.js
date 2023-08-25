const mongoose = require('mongoose');
const destinationSchema = require('./destinationSchema'); 
const ticketSchema = require('./ticketSchema');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN','TYO'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => new Date().setFullYear(new Date().getFullYear() + 1),
  },
  destinations: [destinationSchema], 
  tickets: [ticketSchema],
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;