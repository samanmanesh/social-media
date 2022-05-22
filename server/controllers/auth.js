import User from "../models/user.js";
import { makeHashedPass, compareHashedPass } from "../helpers/bcryptHandler.js";

//!use new Promise or async function to register user?!
export const registerUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  try {
    // generate a new password hash
    const hashedPassword = await makeHashedPass(req.body.password);
    //create a new user
    const newUser = new User({
      username: req.body.username,
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
    // const user = await User.findOne({
    //   email: req.body.email,
    // });
    console.log(req.body);
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    //validate the password
    const isPasswordCorrect = await compareHashedPass(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({
        message: "Password is incorrect",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
