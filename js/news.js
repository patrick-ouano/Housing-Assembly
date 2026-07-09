/* ==========================================================================
   Newsletters list on the news page.
   Entries are fetched from a Google Sheet (via the gviz/tq endpoint) that is
   populated by the "Newsletter Insertion Form" Google Form.

   Form question titles (must match Sheet column headers exactly):
     "Title"       — short answer, required (e.g. "Newsletter 5 — June 2026")
     "Newsletter"  — file upload, required
     "Description" — short answer, optional (shown next to the link)
   ========================================================================== */

/* Sheet must be shared "Anyone with the link → Viewer". Paste the real ID
   after creating the Form and linking it to a Sheet. While this is empty,
   newsletters keep coming from the Document Library sheet (rows whose kind
   is "Newsletter"), so the page never goes blank during the changeover. */
const NEWSLETTER_SHEET_ID = "1tD0Kx8wU3rMvXFWBc2u-_IjEon106_z-VAFZ8kKPGe4";
const NEWSLETTER_SHEET_NAME = "Form Responses 1";

const NEWS_FALLBACK_LIBRARY_SHEET_ID = "1uzVgUCPU_OOqyd0v7p15Xgeeq0lotIRG3ZZDK2XEhu0";
const NEWS_FALLBACK_LIBRARY_SHEET_NAME = "Document Insertion Form (HA) (Responses)";

function newsGvizUrl(sheetId, sheetName) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName
  )}`;
}

/* Fetch a Sheet through gviz and return its rows as plain objects keyed by
   column header, using the formatted cell value when present. */
async function loadNewsSheetRows(sheetId, sheetName) {
  const response = await fetch(newsGvizUrl(sheetId, sheetName));
  if (!response.ok) throw new Error(`Failed to load newsletter Sheet: ${response.status}`);
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

  return rows.map((row) => {
    const obj = {};
    cols.forEach((label, i) => {
      const cell = row.c[i];
      obj[label] = cell ? cell.f ?? cell.v ?? "" : "";
    });
    return obj;
  });
}

/* Find a value by exact column label first, then fall back to a
   case-insensitive partial match — so minor Form question rewording
   (e.g. "Upload the newsletter PDF") doesn't break parsing. */
function newsFindCol(obj, exact, keyword) {
  if (obj[exact] !== undefined && obj[exact] !== "") return obj[exact];
  const key = Object.keys(obj).find(
    (k) => k.toLowerCase().includes(keyword.toLowerCase())
  );
  return key ? obj[key] : "";
}

async function loadNewsletters() {
  if (NEWSLETTER_SHEET_ID) {
    const rows = await loadNewsSheetRows(NEWSLETTER_SHEET_ID, NEWSLETTER_SHEET_NAME);
    const items = rows
      .map((row) => ({
        title: String(newsFindCol(row, "Title", "title") || "").trim(),
        url: String(
          newsFindCol(row, "Newsletter", "newsletter") || newsFindCol(row, "Newsletter Link", "link") || ""
        ).trim(),
        meta: String(newsFindCol(row, "Description", "description") || "").trim(),
      }))
      .filter((item) => item.title);
    /* Until the new Form has submissions, keep showing the newsletters
       already in the Document Library sheet so the page is never empty. */
    if (items.length > 0) return items;
  }

  /* Fallback: Document Library sheet, rows marked as newsletters. */
  const rows = await loadNewsSheetRows(
    NEWS_FALLBACK_LIBRARY_SHEET_ID,
    NEWS_FALLBACK_LIBRARY_SHEET_NAME
  );
  return rows
    .filter(
      (row) =>
        String(row["What kind of item is this? (optional)"] || "").trim() === "Newsletter"
    )
    .map((row) => ({
      title: String(row["Title"] || "").trim(),
      url: String(row["Document Upload"] || row["Document Link"] || "").trim(),
      meta: "",
    }))
    .filter((item) => item.title);
}

function newsIsSafeUrl(url) {
  return /^https?:\/\//i.test(url) || url.startsWith("/") || url.startsWith("files/");
}

/* Sort "Newsletter 1", "Newsletter 2", … by their number; anything without
   a number sorts after them, alphabetically. */
function newsletterSortKey(title) {
  const match = String(title || "").match(/newsletter\s*(\d+)/i);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

async function setupNewsletters() {
  const list = document.getElementById("newsletter-list");
  if (!list) return;

  let newsletters = [];
  try {
    newsletters = await loadNewsletters();
  } catch (error) {
    console.error(error);
  }

  newsletters.sort((a, b) => {
    const numA = newsletterSortKey(a.title);
    const numB = newsletterSortKey(b.title);
    if (numA !== numB) return numA - numB;
    return String(a.title).localeCompare(String(b.title));
  });

  list.innerHTML = newsletters
    .map((item) => {
      const href = item.url && newsIsSafeUrl(item.url) ? item.url : null;
      if (!href) {
        return `<li>${newsEscapeHtml(item.title)}</li>`;
      }
      const meta = item.meta ? `<span class="doc-list__size">${newsEscapeHtml(item.meta)}</span>` : "";
      return `<li>
            <a href="${newsEscapeAttr(href)}" target="_blank" rel="noopener">${newsEscapeHtml(item.title)}</a>
            ${meta}
          </li>`;
    })
    .join("");
}

function newsEscapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function newsEscapeAttr(value) {
  return newsEscapeHtml(value).replace(/"/g, "&quot;");
}

setupNewsletters();
