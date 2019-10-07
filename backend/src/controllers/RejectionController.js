const Booking = require("../models/BookingModel");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate("spot");

    booking.approved = false;

    await booking.save();

    const bookingUsersocket = req.connectedUsers[booking.user];

    if (bookingUsersocket) {
      req.io.to(ownerSocket).emit("booking_response", booking);
    }

    return res.json(booking);
  }
};
