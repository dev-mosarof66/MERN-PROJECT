import uploadOnCloudinary from "../utils/cloudinary.utils.js";
import Video from "../models/video.models.js";
import Like from "../models/like.models.js";
import Comment from "../models/comment.models.js";
import User from "../models/user.models.js";

const addReelsController = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(402).send({
      message: "title and description are required",
    });
  }

  const videoPath = req?.file.path;

  if (!videoPath) {
    return res.status(402).send({
      message: "no file selected",
    });
  }

  const path = await uploadOnCloudinary(videoPath);

  const newVideo = await Video({
    title,
    description,
    url: path.url,
  });

  const userId = req.userId;
  // console.log(`userid in reel container ${userId}`);

  if (!userId) {
    return res.status(402).send({
      message: "login session expired",
    });
  }

  const existedUser = await User.findById({ _id: userId });
  console.log(existedUser);
  existedUser.reels.push(newVideo._id);
  existedUser.save({
    validateBeforeSave: false,
  });
  await newVideo.save();

  return res.status(201).send({
    message: "reel uploaded successfully",
  });
};

const likeReelsController = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(402).send({
      message: "login session expired",
    });
  }

  const videoId = req.params.id;

  const liked = await Like({
    userId,
    videoId,
  });

  await liked.save();
  res.status(201).json({
    message: "video liked",
    liked,
  });
};

const commentReelsController = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(402).json({
      message: "comment is required",
    });
  }

  const userId = req.userId;
  if (!userId) {
    return res.status(402).send({
      message: "login session expired",
    });
  }

  const videoId = req.params.id;

  const commented = await Comment({
    userId,
    videoId,
    comment,
  });

  await commented.save();
  res.status(201).json({
    message: "video liked",
    commented,
  });
};

export const getReelController = async (req, res) => {
  try {
    const reels = await Video.find();
    res.status(200).json(reels);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserReelController = async (req, res) => {
  try {
    const _id = req.userId;
    const existedUser = await User.findById({_id})
    const uploadedReels = (await existedUser.populate('reels')).reels;
    // console.log(uploadedReels);
    
    res.status(200).json(uploadedReels);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addReelsController, likeReelsController, commentReelsController };
