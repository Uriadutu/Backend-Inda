import express from "express";
import { getKeterangan, getKeteranganByUser, createKeternagan, deleteKeterangan, getKeteranganById } from "../controller/Keterangan.js";

const router = express.Router();
router.get("/keterangan", getKeterangan);
router.get("/keterangan/:id", getKeteranganById);
router.get("/keterangan/user/:id", getKeteranganByUser);
router.post("/keterangan", createKeternagan);
router.delete("/keterangan/:id", deleteKeterangan);

export default router;