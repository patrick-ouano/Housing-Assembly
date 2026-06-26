/* ==========================================================================
   Shared layout components.
   The header and footer live here as the single source of truth, then get
   injected into every page's <header id="site-header"> / <footer id="site-footer">.
   To change the navigation or footer once, edit it here.
   ========================================================================== */

const NAV_LINKS = [
  { label: "Home", href: "index.html" },
  { label: "About", href: "about.html" },
  { label: "News", href: "news.html" },
  { label: "Resources", href: "resources.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "Donate", href: "donate.html" },
  { label: "Contact", href: "contact.html" },
];

const CONTACT_EMAIL = "info@housingassembly.org.za";
const FACEBOOK_URL = "https://www.facebook.com/groups/housingassembly/";
const INSTAGRAM_URL = "https://www.instagram.com/thehousingassembly/?hl=en";

/* Filename of the page we're on, used to highlight the active nav link. */
function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function renderHeader() {
  const active = currentPage();

  const items = NAV_LINKS.map((link) => {
    const current = link.href === active ? ' aria-current="page"' : "";
    return `<li><a class="nav__link" href="${link.href}"${current}>${link.label}</a></li>`;
  }).join("");

  return `
    <div class="container site-header__inner">
      <a class="brand" href="index.html">
        <img src="images/logo.png" alt="The Housing Assembly logo" width="52" height="52">
        <span class="brand__name">The Housing<br>Assembly</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-controls="primary-nav" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" id="primary-nav" aria-label="Primary">
        <ul class="nav__list">${items}</ul>
      </nav>
    </div>
  `;
}

function renderFooter() {
  return `
    <div class="container site-footer__cols">
      <div>
        <img class="site-footer__logo" src="images/logo.png" alt="The Housing Assembly logo">
        <p>Housing justice for the Western Cape since 2009.</p>
      </div>
      <div>
        <h3>Instagram</h3>
        <p><a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">@thehousingassembly</a></p>
      </div>
      <div>
        <h3>Facebook</h3>
        <p><a href="${FACEBOOK_URL}" target="_blank" rel="noopener">@housingassembly</a></p>
      </div>
      <div>
        <h3>Contact</h3>
        <p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        <p>Cape Town, South Africa</p>
      </div>
    </div>
    <div class="site-footer__social">
      <a href="${FACEBOOK_URL}" target="_blank" rel="noopener" aria-label="Facebook">
        <svg viewBox="0 0 320 512" aria-hidden="true"><path d="M279.14 288l14.22-92.66h-88.91V134.7c0-25.35 12.42-50.06 52.24-50.06h40.42V5.79S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
      </a>
      <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
      </a>
    </div>
  `;
}

function renderChatbot() {
  return `
    <div class="floating-widgets">
      <button class="widget-btn widget-btn--chatbot" id="chatbot-toggle" aria-label="Open Chatbot" aria-controls="chat-window" aria-expanded="false">
        <svg viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>
      </button>
    </div>

    <div class="chat-window" id="chat-window" aria-hidden="true">
      <div class="chat-window__header">
        <h3>Assembly Bot</h3>
        <button class="chat-window__close" id="chat-close" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-window__wa-banner">
        <a href="https://wa.me/27123456789" target="_blank" rel="noopener">
          <svg viewBox="0 0 448 512" width="16" height="16"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          Speak with Assembly Bot on Whatsapp
        </a>
      </div>
      <div class="chat-window__body">
        <p class="chat-msg">My name is Assembly Bot, an A.I Chatbot for Housing Assembly. Ask me anything and I'll do my best to help!</p>
      </div>
      <div class="chat-window__footer">
        <input type="text" placeholder="Type your message..." aria-label="Chat message">
        <button type="button" class="chat-window__mic" id="chat-mic" aria-label="Speak your message" title="Speak your message">
          <svg viewBox="0 0 384 512" aria-hidden="true"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
        </button>
        <button type="button" class="chat-window__send btn--primary">Send</button>
      </div>
    </div>
  `;
}

function injectLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.className = "site-header";
    header.innerHTML = renderHeader();
  }

  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = renderFooter();
  }

  const chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-ui";
  chatContainer.innerHTML = renderChatbot();
  document.body.appendChild(chatContainer);
}

injectLayout();
