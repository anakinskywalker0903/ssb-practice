# SSB WAT Simulator

A premium, fully client-side **Word Association Test (WAT)** simulator that accurately replicates the SSB Psychology examination format.

## Features

- ✅ **1000+ curated words** across all WAT categories
- ✅ **Randomised** word order every session
- ✅ **Countdown timer** with animated ring + buzzer sound
- ✅ **Distraction-free** test interface
- ✅ **Practice modes** — 20 / 40 / 60 / 100 words, 8 / 10 / 12 / 15 seconds
- ✅ **Web Audio API** beep — no external files needed
- ✅ **Fullscreen mode** — auto-requested on test start
- ✅ **Keyboard shortcuts**: `Space`, `F`, `M`, `Esc`
- ✅ **No backend** — pure HTML/CSS/JS, works offline
- ✅ **Military dark theme** with premium animations

## File Structure

```
wat-ssb/
├── index.html          ← Entry point
├── css/
│   └── style.css       ← Military dark theme
├── js/
│   ├── words.js        ← 1000+ word bank
│   ├── audio.js        ← Web Audio API buzzer
│   ├── timer.js        ← Countdown timer class
│   └── app.js          ← Main application controller
└── README.md
```

## Running Locally

### Option 1 — VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 2 — Python HTTP Server
```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080
```

### Option 3 — Node.js
```bash
npx serve .
# then open the printed URL
```

> **Important:** The app uses ES Modules (`type="module"`), so it **must** be served over HTTP — opening `index.html` directly via `file://` will not work due to CORS restrictions.

## Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Go to **Settings → Pages → Source: main / root**
3. Your app will be live at `https://<username>.github.io/<repo>/`

### Vercel / Netlify
1. Connect your repo
2. Set **Output Directory** to `/` (root)
3. No build command needed — it's pure static HTML

## Keyboard Shortcuts

| Key     | Action             |
|---------|--------------------|
| `Space` | Start Test         |
| `F`     | Toggle Fullscreen  |
| `M`     | Mute / Unmute      |
| `Esc`   | Exit Test          |

## SSB WAT Tips

- Write the **very first word** that comes to mind — don't overthink.
- Aim for **positive, constructive associations** that reflect good OLQs.
- Practice daily to build mental speed and clarity.
- The test assesses your personality, not vocabulary — be natural.

---

*For practice purposes only. This simulator is not affiliated with the Services Selection Board.*
