# SSB Psychology Simulator — WAT & PPDT

A distraction-free, military-grade practice simulator for two key SSB Day 1 psychology tests.

## Tests Available

### WAT — Word Association Test
- 60 words (configurable: 20/40/60/100)
- 15 seconds per word (configurable: 8/10/12/15s)
- Randomised word bank every session
- Buzzer on each word timeout

### PPDT — Picture Perception & Description Test
- 1 hazy ambiguous image per session (authentic SSB style)
- **30 seconds** viewing phase → buzzer → image disappears
- **4 minutes** writing phase → buzzer
- 16 unique AI-generated PPDT-style images
- Anti-repetition: tracks seen images across sessions (resets after all 16 shown)

## Features
- ⌛ Accurate SSB timings
- 🔔 Web Audio API buzzer (no external files)
- 🖥 Fullscreen mode
- 🔇 Mute/unmute
- 📱 Responsive design
- 💾 PPDT session tracking via localStorage
- ⌨ Keyboard shortcuts: SPACE (start), F (fullscreen), M (mute), ESC (exit)

## Usage
Open `index.html` in a browser. No build step required — pure HTML/CSS/JS.

## Deployment
Deployed on Vercel. Static site, no server needed.
