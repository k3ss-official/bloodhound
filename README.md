<div align="center">

<img src="https://raw.githubusercontent.com/k3ss-official/bloodhound/main/assets/STALK.ico" width="96" alt="STALK logo" />

# STALK
### Your personal OSINT assistant

![Electron](https://img.shields.io/badge/Electron-desktop-2b2e3a?logo=electron)
![Vite](https://img.shields.io/badge/Vite-fast-purple?logo=vite)
![React](https://img.shields.io/badge/React-frontend-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38bdf8?logo=tailwindcss)
![Status](https://img.shields.io/badge/status-active%20development-orange)
![Made in Georgia](https://img.shields.io/badge/Made%20in-Georgia-white?labelColor=red)

</div>

---

## 📌 Overview

**STALK** is a desktop OSINT assistant built with **Electron**, **React**, **Vite**, and **Tailwind CSS**.

The project is designed as a unified environment for investigation workflows, data enrichment, quick analysis, and structured visual work inside a desktop application.

Instead of using multiple scattered tabs and utilities, **STALK** brings important OSINT-related functionality into one interface.

---

## ✨ Features

- 🖥️ Desktop application powered by **Electron**
- ⚛️ Frontend built with **React + Vite**
- 🎨 Modern UI with **Tailwind CSS**
- 🧩 Investigation board / visual workspace
- 🌐 Domain information tools
- 🖼️ EXIF metadata reader
- 📊 Reports-related interface
- 🔌 API-related module
- 📞 Phone enrichment utilities
- 🌍 Built-in multilanguage support
- 🔔 Notification window support

---

## 🧠 Core Modules

The project currently includes modules such as:

- **Board** — visual workspace for linking and organizing investigation entities
- **DomainInfo** — domain-related lookup and display logic
- **ExifReader** — EXIF and metadata-oriented functionality
- **Api** — API interaction layer / UI
- **Reports** — reporting-related interface
- **Settings** — app configuration and preferences
- **i18n** — localization system with multiple language packs
- **Enrichment** — entity enrichment tools for:
  - domains
  - IPs
  - phone numbers

---

## 🛠️ Tech Stack

- **Electron**
- **React**
- **Vite**
- **Tailwind CSS**
- **PostCSS**
- **JavaScript / JSX**
- **Node.js**

---

## 📂 Project Structure

```bash
STALK/
├── assets/                      # Icons, audio, static assets
├── electron/                    # Electron main/preload/desktop logic
├── src/                         # React frontend source
│   ├── board/                   # Board workspace modules
│   ├── i18n/                    # Localization system
│   ├── About.jsx
│   ├── Api.jsx
│   ├── App.jsx
│   ├── Board.jsx
│   ├── DomainInfo.jsx
│   ├── ExifReader.jsx
│   ├── MainLayout.jsx
│   ├── Settings.jsx
│   ├── SplashScreen.jsx
│   ├── UpdateBanner.jsx
│   ├── WindowControls.jsx
│   ├── reports.jsx
│   └── settingsStore.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
---

## 👤 Author

**Luka**

* Telegram: [@nonetypeuser](https://t.me/nonetypeuser)
* Telegram channel: [@cyberstalker007](https://t.me/cyberstalker007)
* Email: [admin@stalk.ge](mailto:admin@stalk.ge)
* Website: [stalk.ge](https://stalk.ge)

---

## 🚀 Installation

```bash
git clone https://github.com/k3ss-official/bloodhound.git
cd bloodhound
npm ci
npm run setup     # installs the Electron binary (see note below)
npm start
```

### Why `npm run setup` is a separate step

npm 11 blocks install scripts by default, and that includes this project's own
`postinstall` hook. Electron's binary therefore has to be fetched explicitly.

`npm run setup` is idempotent — it exits immediately when a valid binary is
already present, so running it every time costs nothing.

---

## License

Licensed under the GNU Affero General Public License v3.0.
Copyright (C) 2026 Luka / [stalk.ge](https://stalk.ge)
