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

This site is the organisation's public web presence: campaign information, news and newsletters, a searchable resource library, community mapping tools, donation support, and an AI housing assistant. Day-to-day content is maintained through Google Forms and Sheets so staff can update the site without changing code.

---

## How It Works

1. **Browse the site** — Visitors explore campaigns, news, the gallery, and resources across seven pages.
2. **Search the library** — The Resources page offers a live, filterable catalogue of guides, books, news, and research.
3. **Ask the AI assistant** — "Michael Blake" answers housing questions via a chat widget, with a WhatsApp fallback for direct contact.
4. **Stay updated** — Newsletters and staff contacts are managed through Google Forms and Sheets.
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
- **Searchable document library** — Filterable catalogue of guides, newsletters, books, news, and research.
- **Shared layout** — Header, footer, navigation, and chat widget defined once and reused on every page.
- **Sheet-driven content** — Newsletters and the staff directory are managed through Google Forms and Sheets, no deploys needed.
- **Community tools** — Embedded community map and housing audit applications.
- **Donations** — BackaBuddy campaign embed on the donate page.
- **Hardened delivery** — Security headers and clean URLs on production hosting.

---

## AI Assistant — "Michael Blake"

The chat widget is available on every page and provides a Retrieval-Augmented Generation (RAG) housing assistant.

- Visitors ask housing-related questions in the chat; replies are rendered as safe Markdown.
- A workflow backend orchestrates retrieval from the organisation's knowledge base and keeps short-lived conversation context for the browsing session.
- Speech-to-text dictation, keyboard support, and a WhatsApp link for direct contact are included for accessibility.

---

## Tech Stack

### Front End
- **HTML5** — Static pages, one file per route
- **CSS3** — Site-wide styles
- **Vanilla JavaScript** — No framework or build step

### AI Assistant
- **n8n** — Workflow automation for the RAG pipeline
- **Railway** — Hosting for the workflow runtime
- **Pinecone** — Vector database for semantic retrieval

### Content & Data
- **Google Sheets** — Resource library, newsletters, and staff directory
- **Google Forms** — Content submission for library documents and newsletters

### Hosting & CI
- **Vercel** — Production hosting
- **GitHub Actions** — Automated checks and deployment

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
│   ├── main.js             # Site interactions and chat UI
│   ├── library.js          # Document library
│   ├── news.js             # Newsletter list
│   ├── gallery.js          # Gallery behaviour
│   └── contact.js          # Staff directory
├── images/                 # Photos and logo
├── files/                  # Downloadable PDFs and documents
├── vercel.json             # Hosting configuration
├── sitemap.xml
├── robots.txt
└── .github/workflows/ci.yml
```

---

## Maintaining Content

Most content updates require **no code changes** — they flow through Google Forms and Sheets.

| What to change | Where |
|----------------|--------|
| Navigation or footer | Shared layout component (`js/components.js`) |
| Page copy or layout | The relevant `.html` file |
| Styles | `styles.css` |
| Document library items | Document Insertion Form (Google Form → Sheet) |
| Newsletters | Newsletter Insertion Form (Google Form → Sheet) |
| Staff directory | Contacts Google Sheet |
| Static downloads | Add files under `files/` and link from the relevant page |

---

## CI / Deployment

Pull requests and pushes to `main` run automated checks (JavaScript syntax and HTML validation). Pushes to `main` also deploy the site to Vercel.

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
