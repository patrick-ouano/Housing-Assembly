/* ==========================================================================
   Site interactions.
   Loaded after components.js so the injected header already exists.
   ========================================================================== */

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* Collapse the menu after following a link on mobile. */
  nav.addEventListener("click", (event) => {
    if (event.target.matches(".nav__link")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

setupMobileNav();
