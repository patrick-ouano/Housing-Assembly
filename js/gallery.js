/* ==========================================================================
   Gallery lightbox.
   Clicking a thumbnail opens the full image in an overlay.
   ========================================================================== */

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox?.querySelector(".lightbox__close");
  const thumbs = document.querySelectorAll(".gallery-grid__item");

  if (!lightbox || !lightboxImg || thumbs.length === 0) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const img = thumb.querySelector("img");
      open(thumb.dataset.full, img ? img.alt : "");
    });
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

setupLightbox();
