import { Router } from "express";
import upload from "../middleware/multer.middlewares.js";
import {
  addReelsController,
  likeReelsController,
  commentReelsController,
  getReelController,
  getUserReelController,
} from "../controllers/reel.controllers.js";
import auth from "../middleware/auth.middlewares.js";

const router = Router();

router
  .route("/upload-reel")
  .post(auth, upload.single("video"), addReelsController);
router.route("/get-reels").get(auth, getReelController);
router.route("/uploaded-reels").get(auth, getUserReelController);
router.route("/like/:id").post(auth, likeReelsController);
router.route("/comment/:id").post(auth, commentReelsController);

export default router;
