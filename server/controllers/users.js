import User from "../models/user.js";
import {
  makeHashedPass,
  compareHashedPass,
} from "../helpers/bcryptHandler.js";

export const updateUser = async (req, res) => {
  const { id } = req.params; // id is the user id that we want to update the user

  if (req.body.userId !== id) {
    return res.status(403).json({
      message:
        "You are not authorized to update this user",
    });
  } else if (
    req.body.userId === id ||
    req.body.isAdmin
  ) {
    // if password is provided to be updated
    if (req.body.password) {
      try {
        // generate a new password hash
        const hashedPassword =
          await makeHashedPass(req.body.password);
        //update the user
        req.body.password = hashedPassword;
      } catch (err) {
        return res
          .status(500)
          .json({ message: err.message });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { $set: req.body }
      );
      return res.status(200).json({
        message: "User updated successfully",
        user,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message });
    }
  }
};

export const getUsers = (req, res) => {
  res.send("Hey this is Users route");
};
