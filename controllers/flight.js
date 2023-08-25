
const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const Ticket = require('../models/ticketSchema');



function displayNewForm(req, res) {
    res.render('flights/new');
  }

function createFlight(req, res) {
    const newFlight = new Flight(req.body);
    
    newFlight.save()
      .then(() => {
        res.redirect('/flights');
      })
      .catch(error => {
        res.status(400).json({ message: error.message });
      });
  }

function displayAllFlights(req, res) {
    Flight.find()
      .then(flights => {
        res.render('flights/index', { flights });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }

  function displayFlightDetails(req, res) {
    const flightId = req.params.id;
  
    Flight.findById(flightId)
      .exec()
      .then(flight => {
        if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
        }
  
        Ticket.findById(req.params.id)
        .populate('flight')
        .exec()
        .then(tickets => { 
          res.render('flights/show', { flight, tickets });
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}







  function addDestination(req, res) {
    Flight.findById(req.params.id)
      .then(async flight => {
        if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
        }
  
        const newDestination = new Destination({
          airport: req.body.airport,
          arrival: req.body.arrival,
        });
  
        flight.destinations.push(newDestination);
        await flight.save();
  
        res.redirect(`/flights/${flight._id}`);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }

module.exports = {
    router,
    displayNewForm,
    createFlight,
    displayAllFlights,
    displayFlightDetails,
    addDestination,
};