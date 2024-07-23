import express from "express";
import {
    getUser,
    getUserFriends,
    getRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";