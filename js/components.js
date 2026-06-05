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
        <img src="images/logo.jpg" alt="The Housing Assembly logo" width="52" height="52">
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
        <img class="site-footer__logo" src="images/logo.jpg" alt="The Housing Assembly logo">
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
}

injectLayout();
