import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);

//Delete
router.delete("/:id", verifyAdmin, deleteRoom);

//Get
router.get("/:id", getRoom);

//Get All
router.get("/", getAllRooms);

export default router;
