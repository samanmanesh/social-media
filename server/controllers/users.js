import User from "../models/user.js";
import { makeHashedPass, compareHashedPass } from "../helpers/bcryptHandler.js";
import streamifier from "streamifier";
import cloudinary from "cloudinary";
const MAX_FILE_SIZE = 10485760;

//upload the user image into cloudinary
export const uploadUserProfileImage = async (req, res) => {
  // console.log("uploadUserProfileImage", req.file);

  if (req.file) {
    //version promise
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        return result;
      } catch (error) {
        return error;
      }
    }

    // if size of file is greater than 10mb then reject
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).send({
        message: "File size is too large",
      });
    }

    await upload(req)
      .then((uploaded) => {
        return res.status(200).send(uploaded.url);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send(error);
      });
  } else {
    return res.status(400).send("No file uploaded");
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // id is the user id that we want to update the user

  if (req.body._id !== id) {
    return res.status(403).json({
      message: "You are not authorized to update this user",
    });
  } else if (req.body._id === id || req.body.isAdmin) {
    // if password is provided to be updated
    if (req.body.password) {
      try {
        // generate a new password hash
        const hashedPassword = await makeHashedPass(req.body.password);
        //update the user
        req.body.password = hashedPassword;
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }

    try {
      // const user = await User.findByIdAndUpdate(id, { $set: req.body });
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params; // id is the user id that we want to delete the user

  if (req.body.userId !== id) {
    return res.status(403).json({
      message: "You are not authorized to delete this user",
    });
  } else if (req.body.userId === id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(id);
      return res.status(200).json({
        message: "User deleted successfully",
        user,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export const getUsers = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (user) {
      // this will ignore the filed we don't want to send back to the client like password
      const { password, updatedAt, ...other } = user._doc;
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params; // id is the user id the current user id
  const { userId } = req.body;
  console.log(req.body);
  console.log("id, userId", id, userId);
  if (userId === id) {
    return res.status(403).json({
      message: "You cannot follow yourself",
    });
  }
  //there is a bug here when the user follows another user it will not show up in the following list
  try {
    const userToFollow = await User.findById(id); // the user that we want to follow
    const currentUser = await User.findById(userId); // the user that is currently logged in

    if (currentUser && userToFollow) {
      if (userToFollow.followers.includes(userId)) {
        return res.status(400).json({
          message: "User already followed",
        });
      } else {
        await userToFollow.updateOne({
          $push: { followers: userId },
        });

        await currentUser.updateOne({
          $push: { following: id },
        });

        return res.status(200).json({
          message: "User followed successfully",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  const { id } = req.params; // id is the user id the current user id
  const { userId } = req.body;

  if (userId === id) {
    return res.status(403).json({
      message: "You cannot unfollow yourself",
    });
  }

  try {
    const userToUnfollow = await User.findById(id); // the user that we want to unfollow
    const currentUser = await User.findById(userId); // the user that is currently logged in

    if (currentUser && userToUnfollow) {
      if (!userToUnfollow.followers.includes(userId)) {
        return res.status(400).json({
          message: "User not followed",
        });
      } else {
        await userToUnfollow.updateOne({
          $pull: { followers: userId },
        });

        await currentUser.updateOne({
          $pull: { following: id },
        });

        return res.status(200).json({
          message: "User unfollowed successfully",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getFriends = async (req, res) => {
  //solution 1 is
  // get the user following with the user id provided by the client
  // then go through the following list and get the user with the user id in the following list
  // then get the users following data and return it to the client // it will cost a lot
  //solution 2 is
  // fetch all the users and then filter the users that are not in the current user following list

  try {
    const currUser = await User.findById(req.params.userId);
    if (currUser) {
      const users = await User.find({});
      //filter the users that are not in the current user following list and also not the current user

      const friends = users.filter((user) => {
        return (
          !currUser.following.includes(user._id) && user._id !== currUser._id
        );
      });
      let friendsListSummary = [];
      friends.forEach((friend) => {
        const { _id, username, profilePicture } = friend;
        friendsListSummary.push({
          _id,
          username,
          profilePicture,
        });
      });
      return res.status(200).json(friendsListSummary);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
