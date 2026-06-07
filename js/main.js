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

function setupChatbot() {
  const toggle = document.getElementById("chatbot-toggle");
  const close = document.getElementById("chat-close");
  const chatWindow = document.getElementById("chat-window");

  if (!toggle || !chatWindow) return;

  const toggleChat = () => {
    const isActive = chatWindow.classList.toggle("is-active");
    toggle.setAttribute("aria-expanded", String(isActive));
    chatWindow.setAttribute("aria-hidden", String(!isActive));
  };

  toggle.addEventListener("click", toggleChat);
  close?.addEventListener("click", toggleChat);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow.classList.contains("is-active")) toggleChat();
  });
}

setupMobileNav();
setupChatbot();
