import User from "../models/User.js";

// update User
export const updateUser = async (req, res, next) => {
  const userID = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "User data successfully updated!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete User
export const deleteUser = async (req, res, next) => {
  const UserID = req.params.id;

  try {
    await User.findByIdAndDelete(UserID);
    res
      .status(200)
      .json({ success: true, message: "User data successfully deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single User
export const getUser = async (req, res, next) => {
  const UserID = req.params.id;

  try {
    const findUser = await User.findById(UserID);
    res.status(200).json({
      success: true,
      message: "User data get successfully",
      findUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "All User data get successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};
