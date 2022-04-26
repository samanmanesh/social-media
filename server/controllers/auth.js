import User from "../models/user.js";
import bcrypt from "bcrypt";


//!user new Promise or async function to register user?!

export const registerUser = async (req, res) => {

  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res
      .status(400)
      .send({ message: "User already exists" });
  }
  try {
    // generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      salt
    );

    //create a new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    //save the user to the database and return the respond
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const authenticate = async (req, res) => {
  try {
    //validate the user
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(400)
        .send({ message: "User does not exist" });
    }

    //validate the password
    const isPasswordCorrect =
      await bcrypt.compare(
        req.body.password,
        user.password
      );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .send({
          message: "Password is incorrect",
        });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
