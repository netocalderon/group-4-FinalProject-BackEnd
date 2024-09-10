const uploadControllers = {
    uploadImage: async (req, res) => {
        try {

            res.status(200).json({
                message: "Image uploaded successfully!",
                imageUrl: req.file.path,
            });
        } catch (error) {
            console.error("Image upload error:", error);
            res.status(500).json({ error: "Image upload failed" });
        }
    }
}

export default uploadControllers