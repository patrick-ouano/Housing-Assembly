/* ==========================================================================
   Contact page — staff directory.
   Fetches a Google Sheet (managed directly by staff, no form needed) and
   renders a grid of person cards for the #contact-staff section.

   Sheet setup (create manually, no Form):
     1. Create a Google Sheet with these exact column headers in row 1:
          Name | Position | Contact Email | Location
     2. Share it "Anyone with the link → Viewer"
     3. Replace CONTACT_SHEET_ID and CONTACT_SHEET_NAME below
   ========================================================================== */

const CONTACT_SHEET_ID = "1_OzT1iZTLdM65NTl74_jbzwW0RZygPPKLlkEo0qyK98";
const CONTACT_SHEET_NAME = "Contacts";
const CONTACT_SHEET_GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${CONTACT_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    CONTACT_SHEET_NAME
  )}`;

async function loadContactItems() {
  const response = await fetch(CONTACT_SHEET_GVIZ_URL);
  if (!response.ok) throw new Error(`Failed to load contacts Sheet: ${response.status}`);
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
        name: String(obj["Name"] || "").trim(),
        position: String(obj["Position"] || "").trim(),
        phone: String(obj["Contact Number"] || "").trim(),
        location: String(obj["Location"] || "").trim(),
      };
    })
    .filter((item) => item.name);
}

function staffCardHtml(item) {
  const phoneHtml = item.phone
    ? `<a class="staff-card__phone" href="tel:${escapeAttr(item.phone)}">${escapeHtml(item.phone)}</a>`
    : "";
  const locationHtml = item.location
    ? `<p class="staff-card__location">${escapeHtml(item.location)}</p>`
    : "";
  return `
    <div class="staff-card">
      <h3 class="staff-card__name">${escapeHtml(item.name)}</h3>
      ${item.position ? `<p class="staff-card__position">${escapeHtml(item.position)}</p>` : ""}
      ${phoneHtml}
      ${locationHtml}
    </div>`;
}

async function setupContacts() {
  const container = document.getElementById("contact-staff");
  if (!container) return;

  try {
    const items = await loadContactItems();
    if (items.length === 0) return;
    container.innerHTML = `
      <h2>Our Team</h2>
      <div class="staff-grid">${items.map(staffCardHtml).join("")}</div>`;
  } catch (error) {
    console.error(error);
  }
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

setupContacts();
