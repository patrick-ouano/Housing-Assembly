<!-- Badges -->
<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></a>
</p>

<p align="center">
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  <a href="https://github.com/features/actions"><img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" /></a>
  <a href="https://n8n.io/"><img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" /></a>
  <a href="https://railway.app/"><img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway" /></a>
  <a href="https://www.pinecone.io/"><img src="https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white" alt="Pinecone" /></a>
  <a href="https://developers.google.com/sheets/api"><img src="https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" alt="Google Sheets" /></a>
</p>

---

<h1 align="center">The Housing Assembly</h1>

<p align="center">
  <strong>Decent Housing For All.</strong>
</p>

<p align="center">
  The official website for The Housing Assembly — a grassroots social movement fighting for
  housing justice and dignity across the Western Cape, South Africa, since 2009.
</p>

<p align="center">
  <a href="https://www.housingassembly.org.za/"><strong>www.housingassembly.org.za</strong></a>
</p>

<!-- Link buttons -->
<p align="center">
  <a href="https://www.housingassembly.org.za/"><img src="https://img.shields.io/badge/Website-1572B6?style=for-the-badge&logo=firefoxbrowser&logoColor=white" alt="Website" /></a>
  <a href="https://www.facebook.com/groups/housingassembly/"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook" /></a>
  <a href="https://www.instagram.com/thehousingassembly/?hl=en"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
  <a href="mailto:info@housingassembly.org.za"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<!-- TODO: Add a screenshot of the homepage here -->
<!-- <p align="center">
  <img src="./images/home-1.jpg" alt="The Housing Assembly" width="600" />
</p> -->

---

## Overview

**The Housing Assembly** represents over 20 communities across the Western Cape. We work alongside residents living in informal settlements, backyards, temporary relocation areas, rental stock, and poorly built RDP housing to demand real solutions to housing inequality — as well as broader human rights issues like access to water and basic services.

This repository holds the organisation's public website. It's a fast, framework-free static site that surfaces campaign information, news and newsletters, a searchable resource library, community mapping tools, donation support, and an AI housing assistant — all powered by lightweight Google Sheets and workflow integrations that non-technical staff can maintain.

---

## How It Works

1. **Browse the site** — Visitors explore campaigns, news, the gallery, and resources across seven pages.
2. **Search the library** — The Resources page loads a live, filterable catalogue of guides, books, news, and research from Google Sheets.
3. **Ask the AI assistant** — "Michael Blake" answers housing questions via a chat widget, with a WhatsApp fallback for direct contact.
4. **Stay updated** — Newsletters and staff contacts are managed through Google Forms and Sheets, no code changes required.
5. **Support the movement** — The Donate page embeds a BackaBuddy campaign for contributions.

---

## Site Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Mission overview and community districts |
| About | `/about` | Mission, vision, and active campaigns |
| News | `/news` | Newsletters and updates |
| Resources | `/resources` | Document library, community map, and housing audit |
| Gallery | `/gallery` | Photos from organising and community life |
| Donate | `/donate` | Support the movement via BackaBuddy |
| Contact | `/contact` | Reach the organisation and view the staff directory |

---

## Key Features

- **AI Housing Assistant** — "Michael Blake", a RAG chatbot with speech-to-text dictation and a WhatsApp fallback.
- **Searchable document library** — Filterable catalogue of guides, newsletters, books, news, and research, loaded live from Google Sheets.
- **Shared layout** — Header, footer, navigation, and chat widget defined once in `js/components.js` and injected on every page.
- **Sheet-driven content** — Newsletters and the staff directory are managed through Google Forms and Sheets, no deploys needed.
- **Community tools** — Embedded community map and housing audit applications.
- **Donations** — BackaBuddy campaign embed on the donate page.
- **Hardened delivery** — Content Security Policy and security headers configured in `vercel.json`, with clean URLs (`/about` instead of `/about.html`).

---

## AI Assistant — "Michael Blake"

The chat widget lives on every page (built in `js/components.js`, wired up in `js/main.js`) and provides a Retrieval-Augmented Generation (RAG) housing assistant.

- **Frontend** — Posts messages (`{ message, sessionId }`) to an **n8n** webhook and renders the Markdown reply, sanitised with DOMPurify.
- **Workflow** — An **n8n** automation hosted on **Railway** orchestrates the RAG pipeline and conversation memory (keyed by session id).
- **Knowledge base** — Housing resources embedded into a **Pinecone** vector index for semantic retrieval.
- **Session continuity** — Transcripts persist in `sessionStorage` for the browsing session and reset when the tab closes.
- **Accessibility** — Web Speech API dictation, keyboard support, and a WhatsApp link for direct contact.

> The webhook URL is configured via `N8N_WEBHOOK_URL` in `js/main.js`. The n8n workflow and Pinecone index are managed outside this repository.

---

## Tech Stack

### Front End
- **HTML5** — Static pages, one file per route
- **CSS3** — Site-wide styles in `styles.css`
- **Vanilla JavaScript** — No framework or build step
- **marked** + **DOMPurify** — Safe Markdown rendering in chat (via CDN)

### AI Assistant
- **n8n** — Workflow automation orchestrating the RAG pipeline
- **Railway** — Hosting for the n8n instance
- **Pinecone** — Vector database for semantic retrieval
- **Web Speech API** — Browser-native speech-to-text

### Content & Data
- **Google Sheets** — Resource library, newsletters, and staff directory (public viewer access via gviz)
- **Google Forms** — Content submission for library documents and newsletters

### Hosting & CI
- **Vercel** — Production hosting, clean URLs, and security headers
- **GitHub Actions** — Lint, HTML validation, and deploy on `main`

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (optional; used for the local static server and CI checks)
- A modern web browser

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/patrick-ouano/Housing-Assembly.git
   cd Housing-Assembly
   ```

2. Serve the project root with any static file server:

   ```bash
   npx serve .
   ```

3. Open the URL printed in the terminal (typically `http://localhost:3000`).

> **Note:** Features that fetch remote data (the library, newsletters, staff directory, and AI assistant) need a local server — opening the HTML files directly may block those requests. There is no install step or `.env` file for browsing the public site.

---

## Project Structure

```
Housing-Assembly/
├── index.html              # Home
├── about.html              # Mission, vision, campaigns
├── news.html               # Newsletters
├── resources.html          # Library, community map, housing audit
├── gallery.html            # Photo gallery
├── donate.html             # BackaBuddy donation embed
├── contact.html            # Staff directory
├── styles.css              # Site-wide styles
├── js/
│   ├── components.js       # Shared header, footer, nav, and chat widget
│   ├── main.js             # Interactions + AI chatbot (n8n webhook)
│   ├── library.js          # Document library (Google Sheet–backed)
│   ├── news.js             # Newsletter list (Google Sheet–backed)
│   ├── gallery.js          # Gallery behaviour
│   └── contact.js          # Staff directory (Google Sheet–backed)
├── images/                 # Photos and logo
├── files/                  # Downloadable PDFs and documents
├── vercel.json             # Clean URLs and security headers (CSP)
├── sitemap.xml
├── robots.txt
└── .github/workflows/ci.yml
```

---

## Maintaining Content

Most content updates require **no code changes** — they flow through Google Forms and Sheets.

| What to change | Where |
|----------------|--------|
| Navigation or footer | `js/components.js` (single source of truth for all pages) |
| Page copy or layout | The relevant `.html` file |
| Styles | `styles.css` |
| Document library items | Housing Assembly Document Insertion Form (Google Form → Sheet) |
| Newsletters | Newsletter Insertion Form (Google Form → Sheet) |
| Staff directory | Contacts Google Sheet (`Name`, `Position`, `Contact Email`, `Location`) |
| AI assistant behaviour | The n8n workflow on Railway + Pinecone index (external) |
| Chatbot webhook | `N8N_WEBHOOK_URL` in `js/main.js` |
| Static downloads | Add files under `files/` and link from the relevant page |

See the comments at the top of `js/library.js`, `js/news.js`, and `js/contact.js` for the exact Sheet column requirements.

---

## CI / Deployment

On every pull request and push to `main`, **GitHub Actions**:

1. Checks JavaScript syntax (`node --check` on files under `js/`)
2. Validates HTML with [`html-validate`](https://html-validate.org/)

On push to `main` only, the workflow also builds and deploys to **Vercel**.

Required repository secrets for deploy:

| Secret | Purpose |
|--------|---------|
| `VERCEL_TOKEN` | Vercel authentication |
| `VERCEL_ORG_ID` | Vercel organisation / team ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## Contact

- **Email:** [info@housingassembly.org.za](mailto:info@housingassembly.org.za)
- **Website:** [www.housingassembly.org.za](https://www.housingassembly.org.za/)
- **Facebook:** [Housing Assembly group](https://www.facebook.com/groups/housingassembly/)
- **Instagram:** [@thehousingassembly](https://www.instagram.com/thehousingassembly/?hl=en)

---

<p align="center">
  Built for The Housing Assembly — <strong>Decent Housing For All</strong>
</p>
