import { Router } from "express";
import { getMedicalChatResponse } from "../services/chatService.js";
import { saveChat } from "../services/dataStore.js";
import { findCatalogImageUrlByName } from "../services/herbalCatalog.js";

const router = Router();

function looksLikeImageUrl(value = "") {
  try {
    const raw = String(value || "").trim();
    if (!raw) return false;
    const parsed = new URL(raw);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    const host = parsed.hostname.toLowerCase();
    const trustedHosts = ["upload.wikimedia.org", "images.unsplash.com", "raw.githubusercontent.com"];
    if (!trustedHosts.some((h) => host === h || host.endsWith(`.${h}`))) {
      return false;
    }

    const path = parsed.pathname.toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].some((ext) => path.endsWith(ext));
  } catch {
    return false;
  }
}

function toWikiTitles(name = "") {
  const clean = String(name || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .trim();
  if (!clean) return [];
  const compact = clean.replace(/\s+/g, " ").trim();
  const words = compact.split(" ");
  const joined = words.join("_");
  return [...new Set([joined, compact, words.slice(0, 2).join("_"), words[0]])].filter(Boolean);
}

async function fetchWikipediaImageUrlByName(name = "") {
  const titles = toWikiTitles(name);
  for (const title of titles) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "medical-ai-assistant/1.0 (wikipedia-image-resolver)" }
      });
      if (!res.ok) continue;
      const data = await res.json();
      const candidate = data?.thumbnail?.source || data?.originalimage?.source || "";
      if (looksLikeImageUrl(candidate)) return candidate;
    } catch {
      // Try next title candidate
    }
  }
  return "";
}

function canonicalHerbKey(name = "") {
  return String(name || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    // Keep letters (including Unicode) and numbers
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

router.post("/", async (req, res) => {
  try {
    const { message, language = "en" } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const aiResponse = await getMedicalChatResponse(message, language);
    const backendOrigin = `${req.protocol}://${req.get("host")}`;
    const rawRemedies = aiResponse.herbalRemedies || [];
    const uniqueByHerb = [];
    const seenHerbKeys = new Set();
    for (const r of rawRemedies) {
      const key = canonicalHerbKey(r?.name);
      if (!key || seenHerbKeys.has(key)) continue;
      seenHerbKeys.add(key);
      uniqueByHerb.push(r);
    }

    const usedImageUrls = new Set();
    const remedies = await Promise.all(
      uniqueByHerb.map(async (h) => {
        const catalogUrl = findCatalogImageUrlByName(h?.name || "");
        const aiUrl = looksLikeImageUrl(h?.imageUrl) ? h?.imageUrl : "";
        // Prefer verified catalog images. Only if catalog is missing, try AI/Wikipedia.
        const wikiUrl = !catalogUrl && !aiUrl ? await fetchWikipediaImageUrlByName(h?.name || "") : "";
        let finalUrl = catalogUrl || aiUrl || wikiUrl || "";
        if (usedImageUrls.has(finalUrl)) {
          // Do not repeat the same image across multiple cards in one response.
          finalUrl = "";
        }
        if (finalUrl) {
          usedImageUrls.add(finalUrl);
        }
        return {
          ...h,
          imageUrl: finalUrl
            ? `${backendOrigin}/api/image-proxy?url=${encodeURIComponent(finalUrl)}`
            : ""
        };
      })
    );

    const enriched = {
      ...aiResponse,
      herbalRemedies: remedies
    };
    saveChat({ message, language, aiResponse: enriched });

    return res.json({
      ok: true,
      data: enriched
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Failed to generate medical assistant response",
      details: error.message
    });
  }
});

export default router;
