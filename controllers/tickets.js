const Flight = require('../models/flight');
const Ticket = require('../models/ticketSchema');

function newTicket(req, res) {
  res.render('tickets/new', { flightId: req.params.id });
}

function createTicket(req, res) {
    Flight.findById(req.params.id)
      .then(flight => {
        if (!flight) {
          return res.status(404).json({ message: 'Flight not found' });
        }
  
        const newTicket = new Ticket({
          seat: req.body.seat,
          price: req.body.price,
          flight: flight._id, // Manually add the flight reference
        });
  
        newTicket.save()
          .then(() => {
            res.redirect(`/flights/${flight._id}`);
          })
          .catch(error => {
            res.status(500).json({ message: error.message });
          });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }

module.exports = {
  new: newTicket,
  create: createTicket,
};