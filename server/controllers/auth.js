import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  //todo: check if user exists in db, if not, create new user
  //todo: check if password is correct, if not, return error

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
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};


export const authenticate = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send({ message: "User does not exist" });
    res.status(200).send(user);
    
  } catch (err) {
    res.status(500).send(err);
  }
};
