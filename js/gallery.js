/* ==========================================================================
   Gallery grid + lightbox.
   Thumbnails are fetched from a Google Sheet (via the gviz/tq endpoint)
   that is populated by a Google Form with an image file-upload question.
   Clicking a thumbnail opens the full image in an overlay with caption.

   Form question titles (must match Sheet column headers exactly):
     "Title"       — short answer, required
     "Image"       — file upload, images only, required
     "Description" — short answer, optional
   ========================================================================== */

/* Sheet must be shared "Anyone with the link → Viewer". Replace these with
   the real values after creating the Form and linking it to a Sheet. */
const GALLERY_SHEET_ID = "1FAFRQ9hHTrLzJmDxE5_bEYkZ14DfVX1NevPqwCVfx0E";
const GALLERY_SHEET_NAME = "Form Responses 1";
const GALLERY_SHEET_GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${GALLERY_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    GALLERY_SHEET_NAME
  )}`;

/* A Drive "view" share link (drive.google.com/file/d/<ID>/view) does not
   render inside <img src>; rewrite it to a direct, embeddable form. */
function driveFileUrlToEmbeddable(driveUrl) {
  const match =
    String(driveUrl || "").match(/\/file\/d\/([^/]+)/) ||
    String(driveUrl || "").match(/[?&]id=([^&]+)/);
  if (!match) return null;
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
}

async function loadGalleryItems() {
  const response = await fetch(GALLERY_SHEET_GVIZ_URL);
  if (!response.ok) throw new Error(`Failed to load gallery Sheet: ${response.status}`);
  const text = await response.text();

  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
  if (!match) throw new Error("Unexpected gviz response format");
  const payload = JSON.parse(match[1]);

  if (payload.status === "error") {
    throw new Error(
      `gviz error: ${(payload.errors || []).map((e) => e.detailed_message || e.message).join("; ")}`
    );
  }

  let cols = payload.table.cols.map((c) => (c.label || "").trim());
  let rows = payload.table.rows || [];

  /* gviz sometimes returns parsedNumHeaders:0 and leaves column labels empty,
     treating the header row as data. Detect this and promote row 0 to headers. */
  if (cols.every((c) => c === "") && rows.length > 0) {
    cols = rows[0].c.map((cell) => (cell ? String(cell.v ?? "") : ""));
    rows = rows.slice(1);
  }

  return rows
    .map((row) => {
      const obj = {};
      cols.forEach((label, i) => {
        const cell = row.c[i];
        obj[label] = cell ? cell.f ?? cell.v ?? "" : "";
      });
      return {
        title: String(obj["Title"] || "").trim(),
        src: driveFileUrlToEmbeddable(obj["Image"]),
        description: String(obj["Description"] || "").trim(),
      };
    })
    .filter((item) => item.title && item.src);
}

function renderGalleryGrid(grid, items) {
  grid.innerHTML = items
    .map(
      (item) => `
        <button class="gallery-grid__item" type="button"
            data-full="${escapeAttr(item.src)}"
            data-title="${escapeAttr(item.title)}"
            data-description="${escapeAttr(item.description)}">
          <img src="${escapeAttr(item.src)}" alt="${escapeAttr(item.title)}" loading="lazy">
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
