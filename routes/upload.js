import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/image", upload.single("image"), (req, res) => {
    try {

        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: req.file.path,
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

export default router;

