const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight');
const ticketsController = require('../controllers/tickets');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/flights/new', flightController.displayNewForm);

router.post('/flights', flightController.createFlight);

router.get('/flights', flightController.displayAllFlights);

router.get('/flights/:id', flightController.displayFlightDetails);

router.post('/flights/:id/destinations', flightController.addDestination);

router.get('/flights/:id/tickets/new', ticketsController.new);

router.post('/flights/:id/tickets', ticketsController.create);

module.exports = router;