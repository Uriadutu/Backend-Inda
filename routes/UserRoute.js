import express from "express"
import { getUser, getUserbyId, createUser, deleteUser } from "../controller/User.js";

const router = express.Router();
router.get("/user", getUser);
router.get("/user/:id", getUserbyId);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);

export default router