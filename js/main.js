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

  setupSpeechToText(chatWindow);
  setupChatMessaging(chatWindow);
}

/* Replace with the real n8n webhook URL once it's set up. */
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/ff78618a-90f7-474a-a205-2c718800f7dd";

/* Sends typed/dictated messages to the n8n webhook and shows the reply. */
function setupChatMessaging(chatWindow) {
  const body = chatWindow.querySelector(".chat-window__body");
  const input = chatWindow.querySelector(".chat-window__footer input");
  const sendBtn = chatWindow.querySelector(".chat-window__send");

  if (!body || !input || !sendBtn) return;

  /* Build a message bubble, add it to the chat, and keep the view scrolled down. */
  const addMessage = (text, sender) => {
    const bubble = document.createElement("p");
    bubble.className = sender === "user" ? "chat-msg chat-msg--user" : "chat-msg";
    bubble.textContent = text;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
    return bubble;
  };

  const handleSend = async () => {
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    input.value = "";
    input.focus();

    // Temporary placeholder shown until the webhook responds.
    const pending = addMessage("Assembly Bot is typing…", "bot");
    pending.classList.add("chat-msg--pending");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      const data = await response.json();
      pending.classList.remove("chat-msg--pending");
      pending.textContent = data.reply ?? "Sorry, I didn't get a response.";
    } catch (error) {
      pending.classList.remove("chat-msg--pending");
      pending.textContent = "Sorry, something went wrong. Please try again.";
    } finally {
      body.scrollTop = body.scrollHeight;
    }
  };

  sendBtn.addEventListener("click", handleSend);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });
}

/* Speech-to-text: dictate into the chat input using the Web Speech API. */
function setupSpeechToText(chatWindow) {
  const mic = document.getElementById("chat-mic");
  const input = chatWindow.querySelector(".chat-window__footer input");

  if (!mic || !input) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Hide the button gracefully if the browser doesn't support speech recognition.
  if (!SpeechRecognition) {
    mic.style.display = "none";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-ZA";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let listening = false;

  mic.addEventListener("click", () => {
    if (listening) {
      recognition.stop();
      return;
    }
    try {
      recognition.start();
    } catch {
      /* start() throws if called while already starting — safe to ignore. */
    }
  });

  recognition.addEventListener("start", () => {
    listening = true;
    mic.classList.add("is-listening");
    mic.setAttribute("aria-label", "Stop listening");
  });

  const reset = () => {
    listening = false;
    mic.classList.remove("is-listening");
    mic.setAttribute("aria-label", "Speak your message");
  };

  recognition.addEventListener("end", reset);
  recognition.addEventListener("error", reset);

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    const existing = input.value.trim();
    input.value = existing ? `${existing} ${transcript}` : transcript;
    input.focus();
  });
}

setupMobileNav();
setupChatbot();
