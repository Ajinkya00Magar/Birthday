# Yogi's Birthday Celebration Website 💌

A personalized digital birthday gift for **Yogeshwari Thombare (Yogi)**, lovingly created by her five friends: **Ajinkya, Rutvik, Dipika, Pranav, and Omkar**.

## 1. Running it locally

Dependencies are already installed in `node_modules`. If they're missing:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:

```bash
npm run build
npm run start
```

## 2. Personalizing the Content

All editable text, photos, letters, memories, and wishes live in one file: [data/content.ts](data/content.ts).

### Adding Letters
The `letters` array holds notes from each friend. Ajinkya's and Dipika's letters are currently configured, and more notes from Rutvik, Pranav, or Omkar can be added anytime:

```ts
letters: [
  {
    author: "Friend Name",
    eyebrow: "A short label",
    heading: "A Letter From Friend",
    paragraphs: ["Paragraph 1...", "Paragraph 2..."],
    closing: "With love, Friend",
  },
]
```

### Adding Photos & Videos
All media is stored in [public/photos/](public/photos/) and configured in `data/content.ts`. Both photos and vertical videos are supported across hero, gallery, and closing slots.

### Adding Background Music
Place an MP3 audio file into [public/music/](public/music/) and update `songUrl` and `songTitle` in `data/content.ts`. If `songUrl` is empty `""`, the music player is cleanly hidden.

## 3. Mobile & Android Support
The layout is optimized for Android and mobile screens, with touch-friendly cards, safe-area padding, responsive typography, and high-performance smooth animations that respect user preferences (`prefers-reduced-motion`).
