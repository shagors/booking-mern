import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// create Hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json({
      success: true,
      message: "Hotel data successfully uploaded!",
      savedHotel,
    });
  } catch (err) {
    next(err);
  }
};

// update Hotel
export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully updated!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete Hotel
export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    await Hotel.findByIdAndDelete(hotelId);
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single Hotel
export const getHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const findHotel = await Hotel.findById(hotelId);
    res.status(200).json({
      success: true,
      message: "Hotel data get successfully",
      findHotel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all Hotels
export const getAllHotels = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;
    const limit = Number(req.query.limit) || 1;

    const hotels = await Hotel.find({ featured: req.query.featured }).limit(
      limit
    );
    res.status(200).json(hotels);
    console.log(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
