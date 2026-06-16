# TVOnline

A Chromecast-inspired web TV OS built with React + TypeScript. Watch 80+ live Indian and international TV channels organised by language/region, launch your favourite streaming apps, and search YouTube — all from a single dark-themed TV interface.

![TVOnline](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

---

## Screenshots

| Home | Live TV | Channel Preview | App Launcher |
|------|---------|-----------------|--------------|
| Hero banner + live row + apps | 11 category tabs, 80+ channels | In-app player with back button | 12 streaming services |

---

## Features

### 📺 Live TV — 80+ Channels
Channels are organised into **11 regional/language tabs**:

| Tab | Channels |
|-----|---------|
| 🌍 English News | Republic World, NDTV, WION, BBC News, Al Jazeera, CNN, DW, France 24 |
| 🇮🇳 Hindi | Aaj Tak, ABP News, Zee News, NDTV India, India TV, Republic Bharat, TV9 Bharatvarsh, News18 India, SET India, Zee TV, Colors TV, Star Plus |
| 🎭 Telugu | TV9 Telugu, ABN Andhra Jyothi, NTV Telugu, Sakshi TV, TV5 News, ETV Telugu, Gemini TV, Aditya Music, Lahari Music, Suman TV, Mahaa News |
| 🌺 Tamil | Sun News, Puthiya Thalaimurai, Polimer News, News18 Tamil Nadu, Vijay TV, Kalaignar TV, Sun TV, Makkal TV |
| 🏰 Kannada | TV9 Kannada, Suvarna News, Star Suvarna, Zee Kannada, Colors Super, Public TV |
| 🌴 Malayalam | Asianet News, Manorama News, Janam TV, Reporter Live, Mazhavil Manorama, Asianet |
| 🏛️ Marathi/Bengali/Punjabi/Gujarati | ABP Majha, TV9 Marathi, Zee 24 Taas, ABP Ananda, Zee 24 Ghanta, PTC News, ABtak |
| 🎵 Music | T-Series, Zee Music, Saregama, Tips Music, Sony Music India, Aditya Music, Lahari Music, Lofi Girl, NCS |
| 🎬 Movies | Shemaroo Movies, Rajshri Movies, Goldmines, Ultra Movies, B4U Movies, Sri Balaji Video, Eagle Media Works |
| ⚽ Sports | ESPN, Sky Sports, NBA, ICC Cricket, Star Sports, Eurosport |
| 🎮 Gaming | IGN, PlayStation, Xbox, Nintendo, GameSpot, Markiplier |

Clicking a channel opens an **in-app Channel Preview page** (no new tab). Pressing **Watch Live** navigates to the YouTube live page in the **same window**. The in-app **← Back** button returns to the channel grid.

### 🚀 App Launcher
12 streaming services with one click:
Netflix · Prime Video · Disney+ · Hotstar · Hulu · HBO Max · Apple TV+ · Peacock · Paramount+ · Crunchyroll · Twitch · Spotify

### 🔍 Search
On-screen keyboard + YouTube search (requires optional API key).

### 🔐 Google Sign-In
Optional Google OAuth sign-in for higher YouTube API quota and personalised content.

### 🎨 Design
- Chromecast / Android TV dark aesthetic
- Brand-color gradient cards for every channel (no broken images)
- Hover/focus animations with glow effects
- Collapsible sidebar with live clock
- Arrow-key / D-pad navigable

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State | Zustand 5 |
| Data fetching | TanStack Query 5 |
| Auth | @react-oauth/google |
| Icons | Lucide React |

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/ikppramesh/tvonline.git
cd tvonline
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Required for Search feature only — Live TV works without it
VITE_YOUTUBE_API_KEY=AIzaSy...

# Required for Google Sign-In only
VITE_GOOGLE_CLIENT_ID=1234567890.apps.googleusercontent.com
```

> **Live TV works with no API key.** Every channel card links directly to its YouTube live page — no quota is consumed for browsing.

### 3. Get a free YouTube API key (optional — for Search)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a project → **Enable YouTube Data API v3**
3. Create an **API Key** and paste it in `.env`

### 4. Run

```bash
npm run dev
# Opens at http://localhost:5173
```

### 5. Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── App.tsx                        # Providers: OAuth, Query, Router
├── config/
│   ├── apps.config.ts             # 12 streaming app definitions
│   └── liveTv.config.ts           # 80+ channel definitions (11 categories)
├── types/index.ts                 # TypeScript interfaces
├── store/                         # Zustand stores (auth, liveTV, UI)
├── services/
│   ├── youtubeApi.ts              # YouTube Data API v3 helpers (search only)
│   └── queryClient.ts             # TanStack Query client
├── hooks/                         # useYouTubeLive, useYouTubeSearch, useGoogleAuth…
├── router/routes.tsx              # createBrowserRouter config
├── components/
│   ├── layout/                    # RootLayout, Sidebar
│   ├── home/                      # HeroBanner, LiveChannelRow, FeaturedAppsRow
│   ├── livetv/                    # CategoryTabBar, ChannelCard, ChannelGrid
│   ├── launcher/                  # AppGrid, AppTile
│   ├── search/                    # OnScreenKeyboard
│   ├── settings/                  # AccountPanel, ApiKeyPanel
│   └── shared/                    # LiveBadge, LoadingSpinner, AmbientBackground…
└── pages/
    ├── Home/
    ├── LiveTV/
    ├── AppLauncher/
    ├── Player/                    # Channel Preview + Watch Live redirect
    ├── Search/
    └── Settings/
```

---

## How Live TV Works

```
User clicks channel card
        ↓
Channel Preview page (in-app, same window)
  • Brand-color gradient background
  • Channel name, language tag, LIVE badge
  • ← Back button  →  returns to channel grid
  • Watch Live button  →  window.location.href = YouTube live URL
        ↓
YouTube @ChannelHandle/live opens in same browser window
        ↓
Browser Back  →  returns to TVOnline Channel Preview
```

> YouTube blocks iframe embedding for most Indian TV channels (a deliberate business decision to protect ad revenue on their own platforms). Direct same-window navigation is the only reliable approach without a backend proxy.

---

## Adding / Updating Channels

All channels are in `src/config/liveTv.config.ts`.

Each entry:

```ts
{
  channelId: 'my-channel',          // internal slug (unique)
  ytChannelId: 'UCxxxxxxxxxx',      // YouTube channel ID (UC... format)
  channelName: 'My Channel',
  category: 'hindi',                // one of 11 category values
  liveUrl: 'https://www.youtube.com/@MyChannel/live',
  color: '#E20E21',                 // brand color for gradient card
  tagline: 'Short description',
  language: 'Hindi',                // shown as badge on card
}
```

**To find a channel's YouTube ID:**
1. Open the channel page on YouTube
2. Right-click → View Page Source
3. Search for `"channelId"` — the value is the `UC...` ID

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `←` `→` `↑` `↓` | Navigate between cards |
| `Enter` | Select / click focused item |
| `Escape` | Go back |
| Mouse hover | Also works — sidebar expands on hover |

---

## License

MIT
