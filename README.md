# Orbit AI

A clean, techy browser chatbot built with plain HTML, CSS, and JavaScript.

## Features

- Responsive dark interface with a compact workspace sidebar
- Functional local chatbot with contextual starter responses
- Quick prompt cards, typing indicator, and smooth message transitions
- New conversation control
- Light/dark theme toggle
- Enter-to-send and `Cmd/Ctrl + Enter` keyboard shortcut
- No build step, backend, API key, or dependencies required

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The chatbot is intentionally client-side so it works immediately on GitHub Pages or any static host. To connect it to a real AI provider later, replace `getResponse()` in `script.js` with a request to your own secure backend.
