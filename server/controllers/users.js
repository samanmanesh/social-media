import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  console.log(req.body.userId);

  if (
    req.body.userId !== id ||
    !req.body.isAdmin
  ) {
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          salt
        );
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
