# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Filosofunk** is a Portuguese-language website (filosofunk.com.br) that displays random funk music lyrics ("poesias").

- **Site/** — Vanilla JS/HTML/CSS website (GitHub Pages)

**Hard constraint**: The website must use only vanilla JS, HTML, and CSS — no frameworks or libraries.

## Commands

### Site (no build step)
The site is static. Open `Site/index.html` directly in a browser or serve locally:
```bash
npx serve Site/
```

## Architecture

### Data Flow
`poesias.json` (root) is the single source of truth for all lyrics data. The site fetches it via HTTP on load.

Each entry has:
```json
{
  "estrofe": "lyric excerpt",
  "poesia": "song title",
  "poeta": "artist name",
  "youtubeId": "YouTube video ID",
  "startTime": 42,
  "endTime": 60
}
```

### Site (`Site/js/app.js`)
- On load, fetches `poesias.json` once and caches it in `poetryCollection`. Subsequent hash changes reuse the cached data without re-fetching.
- Shuffles using Fisher-Yates, storing the shuffled order in `localStorage` to avoid repeats across page loads.
- `declarePoetry()` → `setPoetry()` → `exibirPoesia()` is the main display pipeline.
- `exibirPoesia()` also calls `atualizarCompartilhamento()` to update WhatsApp, Twitter and Facebook share links with the current phrase and URL hash.
- URL hash (`#<id>`) enables deep linking to a specific poem.
- YouTube audio is embedded via an iframe that loads `youtube.com/embed/<youtubeId>?start=<startTime>&autoplay=1`. Music only plays after the user explicitly clicks the play button.

## Contributing Phrases

When adding entries to `poesias.json`, follow the existing format. The `endTime` field is optional. Entries are appended to the array — order does not matter since the site shuffles them.
