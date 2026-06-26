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

/* sessionStorage keys: continuity lasts for the browsing session (across page
   navigations in the same tab) and clears when the tab is closed. */
const SESSION_ID_KEY = "assembly-bot-session";
const TRANSCRIPT_KEY = "assembly-bot-transcript";

/* Stable per-visitor id so n8n's memory can tie messages to one conversation. */
function getSessionId() {
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

function loadTranscript() {
  try {
    return JSON.parse(sessionStorage.getItem(TRANSCRIPT_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveTranscript(history) {
  sessionStorage.setItem(TRANSCRIPT_KEY, JSON.stringify(history));
}

/* Sends typed/dictated messages to the n8n webhook and shows the reply. */
function setupChatMessaging(chatWindow) {
  const body = chatWindow.querySelector(".chat-window__body");
  const input = chatWindow.querySelector(".chat-window__footer input");
  const sendBtn = chatWindow.querySelector(".chat-window__send");

  if (!body || !input || !sendBtn) return;

  const sessionId = getSessionId();
  const history = loadTranscript();

  /* Build a message bubble, add it to the chat, and keep the view scrolled down. */
  const addMessage = (text, sender) => {
    const bubble = document.createElement("p");
    bubble.className = sender === "user" ? "chat-msg chat-msg--user" : "chat-msg";
    bubble.textContent = text;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
    return bubble;
  };

  /* Persist a finalised message so it reappears after navigating pages. */
  const record = (text, sender) => {
    history.push({ text, sender });
    saveTranscript(history);
  };

  // Replay this session's earlier messages below the static welcome line.
  history.forEach((entry) => addMessage(entry.text, entry.sender));

  const handleSend = async () => {
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    record(message, "user");
    input.value = "";
    input.focus();

    // Temporary placeholder shown until the webhook responds.
    const pending = addMessage("Assembly Bot is typing…", "bot");
    pending.classList.add("chat-msg--pending");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      const data = await response.json();
      const reply = data.reply ?? "Sorry, I didn't get a response.";
      pending.classList.remove("chat-msg--pending");
      pending.textContent = reply;
      record(reply, "bot");
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
