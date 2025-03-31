import { Router } from "express";
import auth from "../middleware/auth.middlewares.js";
import { getUser, login,logout,register } from "../controllers/user.controller.js";

const router = Router();


router.route('/signup').post(register)
router.route('/login').post(login)
router.route('/check').get(auth,getUser)
router.route('/logout').post(auth,logout)


export default router