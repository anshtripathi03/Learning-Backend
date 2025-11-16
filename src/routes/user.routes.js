import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  getNewAccessTokens
} from "../controllers/users.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser,
);


router.route("/login").post(upload.none(), loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)

router.route("/getAccessToken").post(getNewAccessTokens)

export default router;
