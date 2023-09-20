import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({
      success: true,
      message: "Hotel room data created successfully",
      savedRoom,
    });
  } catch (error) {
    next(error);
  }
};

// update Hotel
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Room data successfully updated!",
      updatedRoom,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete Room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res
      .status(200)
      .json({ success: true, message: "Room data successfully deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single Room
export const getRoom = async (req, res, next) => {
  try {
    const findRoom = await Room.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Room data get successfully",
      findRoom,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all Hotels
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      message: "All Rooms data get successfully",
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
