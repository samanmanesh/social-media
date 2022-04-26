import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const authenticate = async  (req, res) => {
  
  
  
  try {
    // generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    }); 

    //save the user to the database and return the respond
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  }
  catch (err) {
    res.send(err);
  }
};