import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully uploaded!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/:id", async (req, res) => {
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
});

//Delete
router.delete("/:id", async (req, res) => {
  const hotelID = req.params.id;

  try {
    await Hotel.findByIdAndDelete(hotelID);
    res
      .status(200)
      .json({ success: true, message: "Hotel data successfully deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get
router.get("/:id", async (req, res) => {
  const hotelID = req.params.id;

  try {
    const findHotel = await Hotel.findById(hotelID);
    res
      .status(200)
      .json({
        success: true,
        message: "Hotel data get successfully",
        findHotel,
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All
router.get("/", async (req, res) => {
  const hotelID = req.params.id;

  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      message: "All Hotel data get successfully",
      hotels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
