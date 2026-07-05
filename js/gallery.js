/* ==========================================================================
   Gallery grid + lightbox.
   Thumbnails are rendered from data/gallery.json (kept in sync by the
   Google Form -> n8n -> GitHub pipeline) rather than hardcoded in HTML.
   Clicking a thumbnail opens the full image in an overlay.
   ========================================================================== */

async function loadGalleryItems() {
  const response = await fetch("data/gallery.json");
  if (!response.ok) throw new Error(`Failed to load gallery.json: ${response.status}`);
  return response.json();
}

function renderGalleryGrid(grid, items) {
  grid.innerHTML = items
    .map(
      (item) => `
        <button class="gallery-grid__item" type="button" data-full="${escapeAttr(item.src)}" data-title="${escapeAttr(
          item.title || ""
        )}" data-description="${escapeAttr(item.description || "")}">
          <img src="${escapeAttr(item.src)}" alt="${escapeAttr(item.title || "")}" loading="lazy">
        </button>`
    )
    .join("");
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = lightbox?.querySelector(".lightbox__close");
  const grid = document.getElementById("gallery-grid");

  if (!lightbox || !lightboxImg || !grid) return;

  function open(src, title, description) {
    lightboxImg.src = src;
    lightboxImg.alt = title;
    const caption = [title, description].filter(Boolean).join(" — ");
    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  grid.addEventListener("click", (event) => {
    const thumb = event.target.closest(".gallery-grid__item");
    if (!thumb) return;
    open(thumb.dataset.full, thumb.dataset.title, thumb.dataset.description);
  });

  closeBtn?.addEventListener("click", close);

  /* Click the backdrop (but not the image) to close. */
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function setupGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  try {
    const items = await loadGalleryItems();
    renderGalleryGrid(grid, items);
  } catch (error) {
    console.error(error);
  }

  setupLightbox();
}

setupGallery();
