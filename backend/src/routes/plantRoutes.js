import { Router } from "express";
import multer from "multer";
import { identifyPlantFromImage } from "../services/plantService.js";
import { savePlantScan } from "../services/dataStore.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "image file is required" });
    }

    const result = await identifyPlantFromImage(req.file.buffer, req.file.originalname);
    savePlantScan({ fileName: req.file.originalname, result });

    return res.json({
      ok: true,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Plant identification failed",
      details: error.message
    });
  }
});

export default router;
