import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import uploadControllers from "../controllers/upload.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/image", verifyToken, upload.single("image"), uploadControllers.uploadImage);

export default router;