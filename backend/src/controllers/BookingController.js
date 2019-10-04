const Booking = require("../models/BookingModel");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    // Populate preenche os dados quando vem a resposta ao invés de mandar
    // apenas o ID
    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    return res.status(200).json(booking);
  }
};
