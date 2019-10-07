const Booking = require("../models/BookingModel");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: id,
      date
    });

    // Populate preenche os dados quando vem a resposta ao invés de mandar
    // apenas o ID
    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
