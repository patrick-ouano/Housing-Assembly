/* ==========================================================================
   Resource Library.
   Data is loaded live from the Housing Assembly Google Form response sheet.
   Renders a searchable, filterable catalogue into #library on resources.html.
   To add a document: submit via the Document Insertion Form (HA).
   ========================================================================== */

/* Item fields used by the card renderer:
   type     -> short label + badge colour (see styles.css .lib-card__type--*)
   category -> section for filter chips
   url      -> direct link (web pages, news, downloads)
   doi      -> optional; turned into a https://doi.org/ link
   oa       -> optional open-access flag for academic articles
   note     -> shown when there is no url or doi
   linkLabel-> custom action link text (optional) */


/* Human-readable label for each type, used on the badge. */
const TYPE_LABELS = {
  guide: "Guide",
  newsletter: "Newsletter",
  web: "Web Resource",
  book: "Book",
  news: "News Article",
  academic: "Academic Article",
  policy: "Policy Document",
  political_education: "Political Education",
  community: "Community Submission",
};

/* Order the filter chips appear in. New categories submitted via the Google
   Form's Category dropdown (see buildCategoryList) are appended after these. */
const CATEGORY_ORDER = [
  "Housing Assembly Guides",
  "Newsletters",
  "Web Resources",
  "Books",
  "In the News",
  "Activism, Organizing & Political Education",
  "Legal Rights & Housing Law",
  "Policy & Government Documents",
  "Gentrification, Evictions & Forced Removals",
  "Housing Policy & Economy",
  "Informal Settlements & Backyard Dwellings",
  "Related Issues",
];

/* Submissions come from a Google Form whose responses land in a Google
   Sheet. The Sheet is fetched live via the gviz/tq endpoint (no API key,
   no backend). The Sheet must be shared "Anyone with the link can view". */
const LIBRARY_SHEET_ID = "1uzVgUCPU_OOqyd0v7p15Xgeeq0lotIRG3ZZDK2XEhu0";
const LIBRARY_SHEET_NAME = "Document Insertion Form (HA) (Responses)";
const LIBRARY_SHEET_GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${LIBRARY_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    LIBRARY_SHEET_NAME
  )}`;

/* Exact labels from the Google Form "What kind of item is this?" dropdown. */
const SHEET_TYPE_MAP = {
  Guide: "guide",
  Newsletter: "newsletter",
  "Web Resource": "web",
  Book: "book",
  "News article": "news",
  "Academic article": "academic",
  "Policy document": "policy",
  "Political education": "political_education",
};

const COCT_LIBRARY_OPAC = "https://opac.capetown.gov.za";

/* Sheet category values that differ from CATEGORY_ORDER labels. */
const SHEET_CATEGORY_ALIASES = {
  "Books (City of Cape Town Libraries)": "Books",
};

const INVALID_SHEET_TITLES = new Set([
  "i have a link to share",
  "i have a file to upload",
]);

function normalizeUrlForDedupe(url) {
  if (!url) return "";
  try {
    const parsed = new URL(String(url).trim());
    parsed.hash = "";
    return parsed.href.toLowerCase();
  } catch {
    return String(url).trim().toLowerCase();
  }
}

function itemDedupeKey(item) {
  const title = String(item.title || "").trim().toLowerCase();
  const url = item.url ? normalizeUrlForDedupe(item.url) : "";
  /* Use title + url together so shared catalogue homepages (e.g. CoCT OPAC)
     do not collapse distinct books into one entry. */
  if (title && url) return `${title}\0${url}`;
  if (title) return `title:${title}`;
  if (url) return `url:${url}`;
  return null;
}

/* Drop duplicate rows from the sheet (same url or title). */
function dedupeSheetItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = itemDedupeKey(item);
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isCoctOpacUrl(url) {
  if (!url) return false;
  try {
    return new URL(url).hostname.toLowerCase() === "opac.capetown.gov.za";
  } catch {
    return String(url).trim().toLowerCase().startsWith(COCT_LIBRARY_OPAC);
  }
}

async function loadSheetSubmissions() {
  const response = await fetch(LIBRARY_SHEET_GVIZ_URL);
  if (!response.ok) throw new Error(`Failed to load Sheet: ${response.status}`);
  const text = await response.text();

  /* gviz wraps its JSON payload in a JS function call:
     google.visualization.Query.setResponse({...}); */
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
  if (!match) throw new Error("Unexpected gviz response format");
  const payload = JSON.parse(match[1]);

  if (payload.status === "error") {
    throw new Error(
      `gviz error: ${(payload.errors || []).map((e) => e.detailed_message || e.message).join("; ")}`
    );
  }

  const cols = payload.table.cols.map((c) => (c.label || "").trim());
  const rows = payload.table.rows || [];

  return rows
    .map((row) => sheetRowToObject(cols, row))
    .filter((obj) => {
      const title = String(obj["Title"] || "").trim();
      if (!title) return false;
      return !INVALID_SHEET_TITLES.has(title.toLowerCase());
    })
    .map(mapSheetRowToItem);
}

async function loadLibraryItems() {
  return dedupeSheetItems(await loadSheetSubmissions());
}

/* Convert a gviz row (array of {v, f} cells) into a plain object keyed by
   column header, using the formatted value when present. */
function sheetRowToObject(cols, row) {
  const obj = {};
  cols.forEach((label, i) => {
    const cell = row.c[i];
    obj[label] = cell ? cell.f ?? cell.v ?? "" : "";
  });
  return obj;
}

/* Maps one Sheet row (keyed by the Google Form's exact question titles)
   onto the library item shape used by the card renderer. */
function mapSheetRowToItem(row) {
  const title = String(row["Title"] || "").trim();
  const authors = String(row["Author/Source (optional)"] || "").trim();
  const yearRaw = String(row["Year (optional)"] || "").trim();
  const year = /^\d{4}$/.test(yearRaw) ? Number(yearRaw) : null;
  const typeRaw = String(row["What kind of item is this? (optional)"] || "").trim();
  const type = SHEET_TYPE_MAP[typeRaw] || "community";

  let categoryRaw = String(row["Category for filtering (optional)"] || "").trim();
  if (SHEET_CATEGORY_ALIASES[categoryRaw]) {
    categoryRaw = SHEET_CATEGORY_ALIASES[categoryRaw];
  }
  const category = categoryRaw || "Uncategorized";

  /* Backfilled rows often store links in Document Upload; form submissions
     may use either Document Upload or Document Link. */
  const fileUrl = String(row["Document Upload"] || "").trim();
  const linkUrl = String(row["Document Link"] || "").trim();
  const url = fileUrl || linkUrl || null;

  return {
    title,
    authors,
    year,
    type,
    category,
    url,
  };
}

async function setupLibrary() {
  const root = document.getElementById("library");
  if (!root) return;

  const searchInput = root.querySelector("#library-search");
  const chipWrap = root.querySelector("#library-filters");
  const list = root.querySelector("#library-list");
  const count = root.querySelector("#library-count");
  const empty = root.querySelector("#library-empty");

  let activeCategory = "all";
  let allItems = [];

  try {
    allItems = await loadLibraryItems();
  } catch (error) {
    console.error(error);
  }

  /* Build the filter chips: All + curated categories (fixed order) + any
     new category values from the Form. "Uncategorized" is never shown. */
  function buildCategoryList(items) {
    const seen = new Set();
    const dynamic = [];
    items.forEach((item) => {
      const cat = item.category;
      if (!cat || cat === "Uncategorized") return;
      if (CATEGORY_ORDER.includes(cat)) return;
      if (seen.has(cat)) return;
      seen.add(cat);
      dynamic.push(cat);
    });
    dynamic.sort((a, b) => a.localeCompare(b));

    return CATEGORY_ORDER.filter((cat) => items.some((item) => item.category === cat)).concat(
      dynamic
    );
  }

  const presentCategories = buildCategoryList(allItems);

  const chips = [{ value: "all", label: "All" }].concat(
    presentCategories.map((cat) => ({ value: cat, label: cat }))
  );

  chipWrap.innerHTML = chips
    .map(
      (chip, i) =>
        `<button type="button" class="lib-chip${i === 0 ? " is-active" : ""}" data-cat="${escapeAttr(
          chip.value
        )}">${escapeHtml(chip.label)}</button>`
    )
    .join("");

  function isSafeUrl(url) {
    return /^https?:\/\//i.test(url) || url.startsWith("/") || url.startsWith("files/");
  }

  function linkFor(item) {
    if (item.url && isSafeUrl(item.url)) return item.url;
    if (item.doi) return `https://doi.org/${item.doi}`;
    return null;
  }

  function cardHtml(item) {
    const href = linkFor(item);
    const yearText = item.year ? ` &middot; ${item.year}` : "";
    const metaLine = item.meta || item.source || "";
    const authorsLine = item.authors || item.year
      ? `<p class="lib-card__authors">${escapeHtml(item.authors)}${yearText}</p>`
      : "";
    const badges =
      `<span class="lib-card__type lib-card__type--${item.type}">${TYPE_LABELS[item.type] || item.type}</span>` +
      (item.oa ? `<span class="lib-card__oa">Open access</span>` : "");

    const linkText =
      item.linkLabel ||
      (isCoctOpacUrl(href)
        ? "Check location and availability in CoCT Libraries"
        : item.type === "guide" || item.type === "newsletter"
          ? "Download"
          : "View");

    const action = href
      ? `<a class="lib-card__link" href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHtml(
          linkText
        )} <span aria-hidden="true">&rarr;</span></a>`
      : `<span class="lib-card__note">${escapeHtml(item.note || "Reference only")}</span>`;

    return `
      <li class="lib-card" data-type="${item.type}">
        <div class="lib-card__badges">${badges}</div>
        <h3 class="lib-card__title">${escapeHtml(item.title)}</h3>
        ${authorsLine}
        ${metaLine ? `<p class="lib-card__source">${escapeHtml(metaLine)}</p>` : ""}
        <div class="lib-card__foot">${action}</div>
      </li>`;
  }

  function render() {
    const term = searchInput.value.trim().toLowerCase();

    const matches = allItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!term) return true;
      const haystack = [
        item.title,
        item.authors,
        item.source,
        item.category,
        TYPE_LABELS[item.type],
        item.year,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });

    list.innerHTML = matches.map(cardHtml).join("");

    const total = allItems.length;
    count.textContent = matches.length === total
      ? `Showing all ${total} resources`
      : `Showing ${matches.length} of ${total} resources`;

    empty.hidden = matches.length !== 0;
  }

  chipWrap.addEventListener("click", (event) => {
    const btn = event.target.closest(".lib-chip");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    chipWrap.querySelectorAll(".lib-chip").forEach((c) =>
      c.classList.toggle("is-active", c === btn)
    );
    render();
  });

  searchInput.addEventListener("input", render);

  render();
}

function newsletterSortKey(title) {
  const match = String(title || "").match(/newsletter\s*(\d+)/i);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

async function setupNewsletters() {
  const list = document.getElementById("newsletter-list");
  if (!list) return;

  let allItems = [];
  try {
    allItems = await loadLibraryItems();
  } catch (error) {
    console.error(error);
  }

  const newsletters = allItems
    .filter((item) => item.type === "newsletter")
    .sort((a, b) => {
      const numA = newsletterSortKey(a.title);
      const numB = newsletterSortKey(b.title);
      if (numA !== numB) return numA - numB;
      return String(a.title).localeCompare(String(b.title));
    });

  list.innerHTML = newsletters
    .map((item) => {
      const href = (item.url && isSafeUrl(item.url)) ? item.url : null;
      if (!href) {
        return `<li>${escapeHtml(item.title)}</li>`;
      }
      const meta = item.meta ? `<span class="doc-list__size">${escapeHtml(item.meta)}</span>` : "";
      return `<li>
            <a href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a>
            ${meta}
          </li>`;
    })
    .join("");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

if (document.getElementById("library")) {
  setupLibrary();
}
if (document.getElementById("newsletter-list")) {
  setupNewsletters();
}
