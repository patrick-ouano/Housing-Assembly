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

  const isOpen = () => chatWindow.classList.contains("is-active");

  const collapse = () => toggle.classList.add("is-collapsed");
  const expand = () => toggle.classList.remove("is-collapsed");

  /* Show the full "Chat with Blake" pill at the top of the page, and collapse
     it to an icon-only circle once the user scrolls into the content so it
     stops blocking what they're reading. Never changes while the chat is open
     (it stays a circle then). */
  const syncToScroll = () => {
    if (isOpen()) return;
    if (window.scrollY <= 8) expand();
    else collapse();
  };

  const toggleChat = () => {
    const isActive = chatWindow.classList.toggle("is-active");
    toggle.setAttribute("aria-expanded", String(isActive));
    chatWindow.setAttribute("aria-hidden", String(!isActive));
    /* Transform into the small circle while open; restore based on scroll
       position once closed. */
    if (isActive) collapse();
    else syncToScroll();
  };

  /* While scrolled, re-expand the pill after a short idle pause so its label is
     available again once the user stops scrolling. */
  const IDLE_MS = 2500;
  let idleTimer;

  window.addEventListener("scroll", () => {
    if (isOpen()) return;
    if (window.scrollY <= 8) {
      expand();
    } else {
      collapse();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!isOpen()) expand();
      }, IDLE_MS);
    }
  }, { passive: true });

  toggle.addEventListener("click", toggleChat);
  close?.addEventListener("click", toggleChat);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) toggleChat();
  });

  // Set the correct initial state in case the page loads already scrolled.
  syncToScroll();

  setupSpeechToText(chatWindow);
  setupChatMessaging(chatWindow);
}

/* Replace with the real n8n webhook URL once it's set up. */
const N8N_WEBHOOK_URL = "https://n8n-production-3a960.up.railway.app/webhook/ff78618a-90f7-474a-a205-2c718800f7dd";

/* sessionStorage keys: continuity lasts for the browsing session (across page
   navigations in the same tab) and clears when the tab is closed. */
const SESSION_ID_KEY = "michael-blake-session";
const TRANSCRIPT_KEY = "michael-blake-transcript";
const UPDATED_AT_KEY = "michael-blake-updated";

/* Reset the conversation after this much idle time so old chats don't reappear. */
const IDLE_TTL_MS = 30 * 60 * 1000;

/* If the last activity is older than the TTL, wipe the session id and transcript
   so both the UI and n8n's memory (keyed by session id) start fresh. */
function expireIfStale() {
  const last = Number(sessionStorage.getItem(UPDATED_AT_KEY) || 0);
  if (last && Date.now() - last > IDLE_TTL_MS) {
    sessionStorage.removeItem(SESSION_ID_KEY);
    sessionStorage.removeItem(TRANSCRIPT_KEY);
    sessionStorage.removeItem(UPDATED_AT_KEY);
  }
}

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
  sessionStorage.setItem(UPDATED_AT_KEY, String(Date.now()));
}

/* Sends typed/dictated messages to the n8n webhook and shows the reply. */
function setupChatMessaging(chatWindow) {
  const body = chatWindow.querySelector(".chat-window__body");
  const input = chatWindow.querySelector(".chat-window__footer input");
  const sendBtn = chatWindow.querySelector(".chat-window__send");

  if (!body || !input || !sendBtn) return;

  expireIfStale();
  const sessionId = getSessionId();
  const history = loadTranscript();

  /* Fill a bubble: user text stays literal (safe), while bot replies render
     Markdown, sanitised with DOMPurify to strip unsafe HTML before it hits
     the DOM. Falls back to plain text if the libraries fail to load. */
  const setBubbleContent = (bubble, text, sender) => {
    if (sender !== "user" && window.marked && window.DOMPurify) {
      bubble.classList.add("chat-msg--rich");
      bubble.innerHTML = window.DOMPurify.sanitize(
        window.marked.parse(text, { breaks: true })
      );
    } else {
      bubble.classList.remove("chat-msg--rich");
      bubble.textContent = text;
    }
  };

  /* Build a message bubble, add it to the chat, and keep the view scrolled down. */
  const addMessage = (text, sender) => {
    const bubble = document.createElement("div");
    bubble.className = sender === "user" ? "chat-msg chat-msg--user" : "chat-msg";
    setBubbleContent(bubble, text, sender);
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
    const pending = addMessage("Michael Blake is typing…", "bot");
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
      setBubbleContent(pending, reply, "bot");
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
  recognition.lang = "en-US";
  /* Keep listening through short pauses so speech isn't cut off mid-sentence,
     and stream interim results so we can preview text live. */
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let listening = false;
  /* Text already in the box before dictation started; dictation appends to it. */
  let baseText = "";
  /* Finalised chunks are banked here so they're never lost, even as newer
     interim results come and go. */
  let finalTranscript = "";

  mic.addEventListener("click", () => {
    if (listening) {
      /* Stop now; the `end` handler commits whatever was captured. */
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
    baseText = input.value.trim();
    finalTranscript = "";
    mic.classList.add("is-listening");
    mic.setAttribute("aria-label", "Stop listening");
  });

  const reset = () => {
    listening = false;
    mic.classList.remove("is-listening");
    mic.setAttribute("aria-label", "Speak your message");
  };

  /* Combine the base text with the finalised + interim speech and show it,
     keeping the input scrolled to the end so the newest words stay visible. */
  const render = (interim = "") => {
    const spoken = (finalTranscript + interim).trim();
    input.value = baseText && spoken ? `${baseText} ${spoken}` : baseText || spoken;
    input.scrollLeft = input.scrollWidth;
  };

  recognition.addEventListener("end", () => {
    render();
    input.focus();
    reset();
  });

  recognition.addEventListener("error", (event) => {
    reset();
    if (event.error === "not-allowed") {
      alert("Microphone permission was denied. Please allow microphone access in your browser settings.");
    } else if (event.error !== "no-speech") {
      alert("Speech recognition failed. Please try typing instead.");
    }
  });

  recognition.addEventListener("result", (event) => {
    let interim = "";
    /* Bank any newly finalised chunks; collect the rest as live interim text. */
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const chunk = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += chunk + " ";
      } else {
        interim += chunk;
      }
    }
    render(interim);
  });
}

setupMobileNav();
setupChatbot();
