import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import { getStats } from "./services/dataStore.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (_, res) => {
  res.json({
    ok: true,
    message: "Medical AI backend is running",
    endpoints: ["/health", "/api/chat", "/api/plant-detect"]
  });
});

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "medical-ai-backend", stats: getStats() });
});

app.get("/api/image-proxy", async (req, res) => {
  try {
    const rawUrl = (req.query?.url || "").toString();
    if (!rawUrl) {
      return res.status(400).json({ ok: false, error: "Missing url query param" });
    }

    const target = new URL(rawUrl);
    if (!["http:", "https:"].includes(target.protocol)) {
      return res.status(400).json({ ok: false, error: "Only http/https image URLs are allowed" });
    }

    const upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent": "medical-ai-assistant-image-proxy/1.0"
      }
    });
    if (!upstream.ok) {
      return res
        .status(502)
        .json({ ok: false, error: `Image upstream failed: ${upstream.status}` });
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Image proxy failed", details: error.message });
  }
});

app.use("/api/chat", chatRoutes);
app.use("/api/plant-detect", plantRoutes);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://localhost:${PORT} (bound to ${HOST})`);
});
