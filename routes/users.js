import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFreind,
} from "../controllers/users.js";
import { verifyToken } from "../middlware/auth.js";

const router = express.Router();

/** READ */
router.get("/:id" , verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/**UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFreind);

export default router;