import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("You are logged in!!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("You are logged in & you can delete your account!!");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("You are Admin & you can modify anything!!");
// });

//update

router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//Get
router.get("/:id", verifyUser, getUser);

//Get All
router.get("/", verifyAdmin, getAllUsers);

export default router;
