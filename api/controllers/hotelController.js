import Hotel from "../models/Hotel.js";

// create Hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully uploaded!" });
  } catch (err) {
    next(err);
  }
};
// update Hotel
export const updateHotel = async (req, res, next) => {
  const hotelID = req.params.id;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelID,
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
  const hotelID = req.params.id;

  try {
    await Hotel.findByIdAndDelete(hotelID);
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
// get single Hotel
export const getHotel = async (req, res, next) => {
  const hotelID = req.params.id;

  try {
    const findHotel = await Hotel.findById(hotelID);
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
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      message: "All Hotel data get successfully",
      hotels,
    });
  } catch (error) {
    next(error);
  }
};
