# AI Medical + Herbal Assistant (Flutter + Node.js)

Complete MVP for a mobile medical assistant with:

- Symptom chatbot (modern medicine + herbal/Natu Maruthuvam tips)
- Safety precautions and emergency signs
- Plant scanner (camera/gallery image → plant identification + guidance)
- **Offline symptom tips** if the phone cannot reach your PC (so the UI always returns useful text)

## Project Structure

- `mobile/` - Flutter app (chat UI + plant scan)
- `backend/` - Node.js + Express API layer

## 1) Backend Setup

```bash
cd backend
npm install
copy .env.example .env
```

Update `.env` with your keys.

**Chat (pick one — free options are built in):**

| Provider | Free tier | Get a key | `.env` |
|----------|-----------|-----------|--------|
| **Groq** | Yes (fast inference) | [console.groq.com/keys](https://console.groq.com/keys) | `GROQ_API_KEY=...` optional `CHAT_PROVIDER=groq` |
| **Google Gemini** | Yes (Google AI Studio) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | `GEMINI_API_KEY=...` optional `CHAT_PROVIDER=gemini` |
| **OpenAI** | Paid (trial credits sometimes) | [platform.openai.com](https://platform.openai.com) | `OPENAI_API_KEY=...` |

If you have **more than one** key in `.env`, set `CHAT_PROVIDER` to `groq`, `gemini`, or `openai`. If you only set **one** of the keys, the backend uses it automatically in this order: OpenAI → Groq → Gemini.

**Plant scan:** `PLANTNET_API_KEY` — real plant ID (if empty, plant endpoint uses a safe fallback)

Run backend:

```bash
npm run dev
```

Server listens on **`0.0.0.0:5000`** so **phones on the same Wi‑Fi** can connect using your PC LAN IP.

- Health check: `http://localhost:5000/health`

## 2) Flutter Setup

```bash
cd mobile
flutter pub get
flutter run
```

## 3) Connection / “timeout” fix (important)

The app shows the **current server URL** in a banner and under **Settings (gear icon)**.

| Where you run the app | Set server URL to |
|----------------------|-------------------|
| Chrome / Windows / macOS (same machine) | `http://127.0.0.1:5000` |
| Android **emulator** | `http://10.0.2.2:5000` (default) |
| Physical **Android phone** (same Wi‑Fi as PC) | `http://<YOUR_PC_LAN_IP>:5000` |

Example: PC IP is `192.168.1.10` → use `http://192.168.1.10:5000`

**Android note:** HTTP to your PC is allowed via `usesCleartextTraffic` in the Android manifest.

Optional compile-time override:

```bash
flutter run --dart-define=API_BASE_URL=http://192.168.1.10:5000
```

## 4) If chat still times out

1. Confirm backend terminal shows: `Backend running ...`
2. On the phone, open a browser and try: `http://<PC_IP>:5000/health`
3. Windows Firewall: allow **Node.js** or **port 5000** inbound on private networks.

## API Endpoints

- `POST /api/chat` — JSON `{ "message": "...", "language": "en"|"ta" }`
- `POST /api/plant-detect` — `multipart/form-data` field `image`
- `GET /health`

## Notes for Viva

- Chatbot JSON includes tips, medicines, herbal remedies, precautions, emergency signs.
- Plant flow uses PlantNet when `PLANTNET_API_KEY` is set.
- Educational assistant only — not a replacement for a licensed clinician.
